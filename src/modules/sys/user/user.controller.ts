import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAllUsername();
  }

  @Get('/username')
  findUser(@Query('username') username) {
    return this.userService.findOneByUsername(username);
  }
}
