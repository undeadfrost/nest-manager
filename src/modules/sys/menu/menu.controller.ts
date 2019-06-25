import { Controller, Get, UseGuards, Delete, Param, Post, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../../guards/auth.guard';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUseTags('menu')
@Controller('sys/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @ApiOperation({ title: '获取菜单列表', description: '权限标识 sys:menu:list' })
  @Get()
  @Permission('sys:menu:list')
  async getMenuAll() {
    const menuList: [] = await this.menuService.findMenuAll();
    return { status: 'success', data: menuList };
  }

  @ApiOperation({ title: '获取菜单信息', description: '权限标识 sys:menu:info' })
  @Get(':id')
  @Permission('sys:menu:info')
  async getMenuInfo(@Param('id') id: number) {
    const menuInfo = await this.menuService.getMenuInfo(id);
    return { status: 'success', data: menuInfo };
  }

  @ApiOperation({ title: '删除菜单', description: '权限标识 sys:menu:delete' })
  @Delete(':id')
  @Permission('sys:menu:delete')
  async delMenuOne(@Param('id') id: number) {
    await this.menuService.delMenuOne(id);
    return { status: 'success', message: '删除菜单成功！' };
  }

  @ApiOperation({ title: '新增菜单', description: '权限标识 sys:menu:create' })
  @Post()
  @Permission('sys:menu:create')
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    await this.menuService.createMenu(createMenuDto);
    return { status: 'success', message: '创建菜单成功！' };
  }

  @ApiOperation({ title: '更新菜单信息', description: '权限标识 sys:menu:update' })
  @Put(':id')
  @Permission('sys:menu:update')
  async putMenu(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    await this.menuService.updateMenu(id, updateMenuDto);
    return { status: 'success', message: '更新菜单成功！' };
  }
}
