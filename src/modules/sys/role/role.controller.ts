import {Controller, Get, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../../../guards/auth.guard';

@Controller('sys/role')
export class RoleController {
  @Get()
  @UseGuards(JwtAuthGuard)
  role() {
    return 'role';
  }
}
