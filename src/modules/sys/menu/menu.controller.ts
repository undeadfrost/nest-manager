import { Controller, Get, UseGuards } from '@nestjs/common';

import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../../guards/auth.guard';

@Controller('sys/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getH() {
    return 'menu';
  }
}
