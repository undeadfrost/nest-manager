import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { RoleService } from './role.service';
import { Permission } from '../../../decorator/permission.decorator';

@ApiUseTags('role')
@Controller('sys/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:role:list')
  findRoleAll() {
    return this.roleService.findRoleAll();
  }
}
