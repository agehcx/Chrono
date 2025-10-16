import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async topPlayers(limit = 50) {
    const players = await this.prisma.user.findMany({
      orderBy: [{rating: 'desc'}, {totalSolved: 'desc'}],
      take: limit
    });

    return players.map((player, index) => ({
      rank: index + 1,
      userId: player.id,
      displayName: player.displayName,
      rating: player.rating,
      totalSolved: player.totalSolved,
      streak: player.streak
    }));
  }
}
