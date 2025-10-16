import {Module} from '@nestjs/common';
import {MatchesService} from './matches.service';
import {MatchesGateway} from './matches.gateway';
import {MatchesController} from './matches.controller';
import {ProblemsModule} from '../problems/problems.module';
import {PrismaModule} from '../prisma/prisma.module';
import {CodeRunnerService} from '../runner/code-runner.service';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [PrismaModule, ProblemsModule, AuthModule],
  controllers: [MatchesController],
  providers: [MatchesService, MatchesGateway, CodeRunnerService],
  exports: [MatchesService]
})
export class MatchesModule {}
