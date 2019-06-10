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
    const data = await this.authService.login(authLoginDto);
    return { status: 'success', data, message: '登录成功!' };
  }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    await this.authService.createUser(authRegisterDto);
    return { status: 'success', message: '创建用户成功,请妥善保管信息！' };
  }

  @Get('navs')
  @UseGuards(JwtAuthGuard)
  async getMenus(@User() user: UserEntity) {
    const data = await this.authService.getUserNav(user);
    return { status: 'success', data };
  }

  @Get('permissions')
  @UseGuards(JwtAuthGuard)
  async getPermissions(@User() user: UserEntity) {
    const data = await this.authService.getUserPermissions(user);
    return { status: 'success', data };
  }
}
