import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';
import { Permission } from '../../../decorator/permission.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:user:list')
  findAll() {
    return this.userService.findAllUsername();
  }

  @Get('/username')
  @UseGuards(AuthGuard('jwt'))
  findUser(@Query('username') username) {
    return this.userService.findOneByUsername(username);
  }
}
