import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import {Request} from 'express';
import {AuthService} from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserFromToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }

    (request as Request & {user?: typeof user}).user = user;
    return true;
  }

  private extractBearerToken(request: Request) {
    const header = request.headers.authorization;
    if (!header) return null;
    if (!header.startsWith('Bearer ')) return null;
    return header.substring(7);
  }
}
