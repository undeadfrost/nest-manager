import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }

  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.createUser(authRegisterDto);
  }
}
