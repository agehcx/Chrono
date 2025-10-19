import {Injectable, UnauthorizedException} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import {PrismaService} from '../prisma/prisma.service';
import {VerifyWorldIdDto} from './dto/verify-world-id.dto';
import {WorldIdService} from './world-id.service';
import type {User} from '@prisma/client';

interface TokenPayload {
  sub: string;
  worldId: string;
}

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET ?? 'dev-secret';
  private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

  constructor(
    private readonly prisma: PrismaService,
    private readonly worldId: WorldIdService
  ) {}

  async verifyWorldId(dto: VerifyWorldIdDto) {
    const verification = await this.worldId.verifyProof(dto);
    if (!verification) {
      throw new UnauthorizedException('World ID verification failed');
    }

    const user = await this.upsertUser(verification.nullifierHash);

    const token = this.issueToken({
      sub: user.id,
      worldId: user.worldId
    });

    return {token, user};
  }

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as TokenPayload;
      return this.prisma.user.findUnique({where: {id: payload.sub}});
    } catch (error) {
      return null;
    }
  }

  private issueToken(payload: TokenPayload) {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    });
  }

  private async upsertUser(worldId: string) {
    const profileLabel = worldId.slice(0, 6).toUpperCase();
    return this.prisma.user.upsert({
      where: {worldId},
      update: {},
      create: {
        worldId,
  displayName: `Chrono Player ${profileLabel}`
      }
    });
  }
}
