import { Controller, Get, Post, UseGuards, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { RoleService } from './role.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateRoleDto } from './role.dto';
import { MenuService } from '../menu/menu.service';
import { ParseIntPipe } from '../../../pipes/parse-int.pipe';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUseTags('role')
@Controller('sys/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService) {
  }

  @ApiOperation({ title: '获取角色列表', description: '权限标识 sys:role:list' })
  @Get()
  @Permission('sys:role:list')
  async getRoleAll() {
    const roleList: [] = await this.roleService.findRoleAll();
    return { status: 'success', data: roleList };
  }

  @ApiOperation({ title: '新建角色', description: '权限标识 sys:role:create' })
  @Post()
  @Permission('sys:role:create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const menuIds: number[] = createRoleDto.menuIds;
    const menus = await this.menuService.findMenuByIds(menuIds);
    await this.roleService.createRole(createRoleDto, menus);
    return { status: 'success', message: '创建角色成功！' };
  }

  @ApiOperation({ title: '删除单个角色', description: '权限标识 sys:role:delete' })
  @Delete(':id')
  @Permission('sys:role:delete')
  async delRoleOne(@Param('id') id: number) {
    await this.roleService.delRoleOne(id);
    return { status: 'success', message: '删除角色成功！' };
  }

  @ApiOperation({ title: '更新角色信息', description: '权限标识 sys:role:update' })
  @Put(':id')
  @Permission('sys:role:update')
  async putRoleInfo(@Param('id', ParseIntPipe) id: number, @Body() createRoleDto: CreateRoleDto) {
    const menuIds: number[] = createRoleDto.menuIds;
    const menus = await this.menuService.findMenuByIds(menuIds);
    await this.roleService.putRoleInfo(id, createRoleDto, menus);
    return { status: 'success', message: '更新角色成功！' };
  }
}
