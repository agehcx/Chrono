import {Body, Controller, Get, Headers, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {VerifyWorldIdDto} from './dto/verify-world-id.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('world-id/verify')
  async verifyWorldId(@Body() body: VerifyWorldIdDto) {
    const {token, user} = await this.authService.verifyWorldId(body);
    return {
      token,
      user
    };
  }

  @Get('me')
  async getMe(@Headers('authorization') authorization?: string) {
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token = authorization.replace('Bearer ', '');
    const user = await this.authService.getUserFromToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {user};
  }
}
