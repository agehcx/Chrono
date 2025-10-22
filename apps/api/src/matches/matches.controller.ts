import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {MatchesService} from './matches.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

interface RuntimeParticipantResponse {
  userId: string;
  socketId: string;
  submitted: boolean;
  score: number;
  submissionId?: string;
}

interface RuntimeMatchResponse {
  id: string;
  problemId: string;
  mode: 'SOLO' | 'PVP';
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  participants: RuntimeParticipantResponse[];
}

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('solo')
  async createSolo(@Req() req: any) {
    const {match, problem} = await this.matchesService.createSoloMatch(req.user);
    return {match, problem};
  }

  @Get(':id/runtime')
  async getRuntime(@Param('id') id: string): Promise<{status: 'NOT_FOUND'} | RuntimeMatchResponse> {
    const runtime = await this.matchesService.getMatchRuntime(id);
    if (!runtime) {
      return {status: 'NOT_FOUND'};
    }

    return {
      id: runtime.id,
      problemId: runtime.problemId,
      mode: runtime.mode,
      status: runtime.status,
      participants: Array.from(runtime.participants.values())
    };
  }
}
