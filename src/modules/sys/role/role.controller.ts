import { Controller, Get, Post, UseGuards, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { RoleService } from './role.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateRoleDto } from './role.dto';
import { MenuService } from '../menu/menu.service';
import { ParseIntPipe } from '../../../pipes/parse-int.pipe';

@ApiUseTags('role')
@Controller('sys/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService) {
  }

  @ApiOperation({ title: '获取角色列表' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:role:list')
  findRoleAll() {
    return this.roleService.findRoleAll();
  }

  @ApiOperation({ title: '新建角色' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
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
  delRoleOne(@Param('id') id: number) {
    return this.roleService.delOneRole(id);
  }

  @ApiOperation({ title: '更新角色信息' })
  @Put(':id')
  // @Permission('sys:role:update')
  async putRoleInfo(@Param('id', ParseIntPipe) id: number, @Body() createRoleDto: CreateRoleDto) {
    const menuIds: number[] = createRoleDto.menuIds;
    const menus = await this.menuService.findMenuByIds(menuIds);
    return this.roleService.putRoleInfo(id, createRoleDto, menus);
  }
}
