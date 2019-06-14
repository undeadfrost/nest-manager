import { Controller, Get, Post, UseGuards, Query, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateUserDto } from './user.dto';

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

  @Post()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:user:create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Get('/username')
  @UseGuards(AuthGuard('jwt'))
  findUser(@Query('username') username) {
    return this.userService.findOneByUsername(username);
  }
}
