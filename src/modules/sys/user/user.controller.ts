import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';
import { Permission } from '../../../decorator/permission.decorator';
import { from } from 'rxjs';

@ApiUseTags('user')
@Controller('/sys/user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:user:list')
  findUserAll() {
    return this.userService.findUserAll();
  }

  @Get('/username')
  @UseGuards(AuthGuard('jwt'))
  findUser(@Query('username') username) {
    return this.userService.findOneByUsername(username);
  }
}
