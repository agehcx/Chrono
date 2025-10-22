import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {MatchesService} from './matches.service';
import {AuthService} from '../auth/auth.service';

@WebSocketGateway({namespace: '/matches', cors: {origin: process.env.WEB_ORIGIN?.split(',') ?? '*'}})
export class MatchesGateway {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly matchesService: MatchesService,
    private readonly authService: AuthService
  ) {}

  @SubscribeMessage('joinQueue')
  async handleJoinQueue(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: {token: string}
  ) {
    const user = await this.authService.getUserFromToken(body.token);
    if (!user) {
      socket.emit('error', {message: 'unauthorized'});
      return;
    }

    const match = await this.matchesService.enqueueForPvp(user, socket.id);
    if (match) {
      const runtime = await this.matchesService.getMatchRuntime(match.match.id);
      runtime?.participants.forEach((participant) => {
  const target = this.server.sockets.sockets.get(participant.socketId);
        target?.emit('matchReady', {
          matchId: match.match.id,
          problem: match.problem
        });
      });
    } else {
      socket.emit('queued');
    }
  }

  @SubscribeMessage('submitSolution')
  async handleSubmitSolution(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: {token: string; matchId: string; code: string}
  ) {
    const user = await this.authService.getUserFromToken(body.token);
    if (!user) {
      socket.emit('error', {message: 'unauthorized'});
      return;
    }

    try {
      const submission = await this.matchesService.submitSolution(body.matchId, user, body.code);
      socket.emit('submissionResult', submission);
      const runtime = await this.matchesService.getMatchRuntime(body.matchId);
      if (runtime?.status === 'COMPLETED') {
        runtime.participants.forEach((participant) => {
          const target = this.server.sockets.sockets.get(participant.socketId);
          target?.emit('matchCompleted');
        });
      }
    } catch (error) {
      socket.emit('error', {message: error instanceof Error ? error.message : String(error)});
    }
  }
}
