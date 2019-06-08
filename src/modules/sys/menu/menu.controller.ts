import { Controller, Get, UseGuards } from '@nestjs/common';

import { MenuService } from './menu.service';

@Controller('sys/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }
}
