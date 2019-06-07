import { Controller, Get, UseGuards } from '@nestjs/common';

import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../../guards/auth.guard';
import { User } from '../../../decorator/user.decorator';
import { User as UserEntity} from '../user/user.entity';

@Controller('sys/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getMenus(@User() user: UserEntity) {
    return this.menuService.findUserMenu(user);
  }
}
