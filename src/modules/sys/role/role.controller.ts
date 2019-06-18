import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { RoleService } from './role.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateRoleDto } from './role.dto';
import { MenuService } from '../menu/menu.service';

@ApiUseTags('role')
@Controller('sys/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService) {
  }

  @ApiOperation({ title: '获取角色列表' })
  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:role:list')
  findRoleAll() {
    return this.roleService.findRoleAll();
  }

  @ApiOperation({ title: '新建角色' })
  @Post()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:role:create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const menuIds: number[] = createRoleDto.menuIds;
    const menus = await this.menuService.findMenuByIds(menuIds);
    await this.roleService.createRole(createRoleDto, menus);
    return { status: 'success', message: '创建角色成功！' };
  }
}
