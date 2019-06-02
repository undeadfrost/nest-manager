import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.createToken(authLoginDto.username);
  }

  @Post('register')
  register(@Body() user: User) {
    return this.authService.createUser(user);
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
