import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../../guards/auth.guard';
import { Permission } from '../../../decorator/permission.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUseTags('menu')
@Controller('sys/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @ApiOperation({ title: '获取菜单列表', description: '权限标识 sys:menu:list' })
  @Get()
  // @Permission('sys:menu:list')
  getMenuAll() {
    return this.menuService.findMenuAll();
  }
}
