import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.createToken(loginDto.username);
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
