import {Controller, Get, Query} from '@nestjs/common';
import {LeaderboardService} from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  list(@Query('limit') limit?: string) {
    return this.leaderboardService.topPlayers(limit ? Number(limit) : undefined);
  }
}
