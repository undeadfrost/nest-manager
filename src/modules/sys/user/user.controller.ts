import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
}
