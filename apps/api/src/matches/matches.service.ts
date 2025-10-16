import {Injectable, Logger} from '@nestjs/common';
import {nanoid} from 'nanoid';
import {Prisma, type Match, type User} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
import {ProblemsService} from '../problems/problems.service';
import {CodeRunnerService} from '../runner/code-runner.service';

interface QueueEntry {
  userId: string;
  socketId: string;
}

interface RuntimeParticipant {
  userId: string;
  socketId: string;
  submitted: boolean;
  score: number;
  submissionId?: string;
}

interface RuntimeMatch {
  id: string;
  problemId: string;
  mode: 'SOLO' | 'PVP';
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  participants: Map<string, RuntimeParticipant>;
}

@Injectable()
export class MatchesService {
  private readonly logger = new Logger(MatchesService.name);
  private readonly queue: QueueEntry[] = [];
  private readonly runtimeMatches = new Map<string, RuntimeMatch>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly problems: ProblemsService,
    private readonly runner: CodeRunnerService
  ) {}

  async createSoloMatch(user: User) {
    const problem = await this.pickRandomProblem();
    const match = await this.prisma.match.create({
      data: {
        mode: 'SOLO',
        status: 'ACTIVE',
        problemId: problem.id,
        participants: {
          create: [{userId: user.id}]
        }
      },
      include: {participants: true}
    });

    this.runtimeMatches.set(match.id, {
      id: match.id,
      problemId: problem.id,
      mode: 'SOLO',
      status: 'IN_PROGRESS',
      participants: new Map(
        match.participants.map((participant) => [participant.userId, {
          userId: participant.userId,
          socketId: '',
          submitted: false,
          score: 0,
          submissionId: undefined
        }])
      )
    });

    return {match, problem};
  }

  async enqueueForPvp(user: User, socketId: string) {
    const alreadyQueued = this.queue.find((entry) => entry.userId === user.id);
    if (!alreadyQueued) {
      this.queue.push({userId: user.id, socketId});
      this.logger.debug(`User ${user.id} joined the PvP queue`);
    }

    if (this.queue.length >= 2) {
      const players = this.queue.splice(0, 2);
      return this.createPvpMatch(players);
    }

    return null;
  }

  async submitSolution(matchId: string, user: User, code: string) {
    const runtime = this.runtimeMatches.get(matchId);
    if (!runtime) {
      throw new Error('Match not found');
    }

    const participant = runtime.participants.get(user.id);
    if (!participant) {
      throw new Error('Participant not part of match');
    }

    if (participant.submitted) {
      return this.prisma.submission.findUnique({where: {id: participant.submissionId!}});
    }

    const match = await this.prisma.match.findUnique({
      where: {id: matchId},
      include: {
        problem: true
      }
    });

    if (!match) {
      throw new Error('Match missing');
    }

    const tests = match.problem.testCases as {tests: Array<{input: unknown; expected: unknown}>; functionName: string};
    const result = await this.runner.runJavaScript(code, tests.tests, tests.functionName);

    const submission = await this.prisma.submission.create({
      data: {
        userId: user.id,
        problemId: match.problemId,
        code,
        language: 'javascript',
        status: result.passed ? 'PASSED' : 'FAILED',
        score: result.passed ? 100 : 0,
        executionTime: result.executionTimeMs ?? null
      }
    });

    await this.prisma.matchParticipant.updateMany({
      where: {matchId, userId: user.id},
      data: {
        submissionId: submission.id,
        score: submission.score,
        completedAt: new Date()
      }
    });

    participant.submitted = true;
    participant.score = submission.score;
    participant.submissionId = submission.id;

    const everyoneSubmitted = Array.from(runtime.participants.values()).every((item) => item.submitted);
    if (everyoneSubmitted) {
      await this.finalizeMatch(matchId);
    }

    return submission;
  }

  async getMatchRuntime(matchId: string) {
    return this.runtimeMatches.get(matchId);
  }

  private async finalizeMatch(matchId: string) {
    const runtime = this.runtimeMatches.get(matchId);
    if (!runtime) return;

    const participants = Array.from(runtime.participants.values()).sort((a, b) => b.score - a.score);

    await this.prisma.$transaction(
      participants.map((participant, index) =>
        this.prisma.matchParticipant.updateMany({
          where: {matchId, userId: participant.userId},
          data: {
            rank: index + 1,
            isWinner: index === 0
          }
        })
      )
    );

    await this.prisma.match.update({
      where: {id: matchId},
      data: {
        status: 'COMPLETED',
        endedAt: new Date()
      }
    });

    runtime.status = 'COMPLETED';
  }

  private async createPvpMatch(players: QueueEntry[]) {
    const problem = await this.pickRandomProblem();
    const match = await this.prisma.match.create({
      data: {
        mode: 'PVP',
        status: 'ACTIVE',
        problemId: problem.id,
        participants: {
          create: players.map((player) => ({userId: player.userId}))
        }
      },
      include: {participants: true}
    });

    const runtime: RuntimeMatch = {
      id: match.id,
      problemId: problem.id,
      mode: 'PVP',
      status: 'IN_PROGRESS',
      participants: new Map()
    };

    for (const participant of players) {
      runtime.participants.set(participant.userId, {
        userId: participant.userId,
        socketId: participant.socketId,
        submitted: false,
        score: 0
      });
    }

    this.runtimeMatches.set(match.id, runtime);

    return {match, problem};
  }

  private async pickRandomProblem() {
    const total = await this.prisma.problem.count({where: {isActive: true}});
    const skip = total > 1 ? Math.floor(Math.random() * total) : 0;
    const problem = await this.prisma.problem.findFirst({
      where: {isActive: true},
      skip,
      orderBy: {createdAt: 'asc'}
    });

    if (!problem) {
      throw new Error('No problems available');
    }

    return problem;
  }
}
