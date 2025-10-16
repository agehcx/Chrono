import {Body, Controller, Get, Put, Req, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UpdateProfileDto} from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateMe(@Req() req: any, @Body() body: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, body);
  }
}
