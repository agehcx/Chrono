import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from '../prisma/prisma.module';
import {AuthModule} from '../auth/auth.module';
import {UsersModule} from '../users/users.module';
import {ProblemsModule} from '../problems/problems.module';
import {MatchesModule} from '../matches/matches.module';
import {LeaderboardModule} from '../leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProblemsModule,
    MatchesModule,
    LeaderboardModule
  ]
})
export class AppModule {}
