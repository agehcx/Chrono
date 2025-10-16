import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {MatchesService} from './matches.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

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
  async getRuntime(@Param('id') id: string) {
    const runtime = await this.matchesService.getMatchRuntime(id);
    if (!runtime) {
      return {status: 'NOT_FOUND'};
    }

    return runtime;
  }
}
