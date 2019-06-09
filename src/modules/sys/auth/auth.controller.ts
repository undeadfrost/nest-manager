import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { JwtAuthGuard } from '../../../guards/auth.guard';
import { User } from '../../../decorator/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }

  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.createUser(authRegisterDto);
  }

  @Get('navs')
  @UseGuards(JwtAuthGuard)
  getMenus(@User() user: UserEntity) {
    return this.authService.getUserNav(user);
  }

  @Get('permissions')
  @UseGuards(JwtAuthGuard)
  getPermissions(@User() user: UserEntity) {
    return this.authService.getUserPermissions(user);
  }
}
