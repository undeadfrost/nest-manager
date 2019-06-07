import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {
  }

  async findUserMenu(user: any): Promise<any> {
    const menuList = await this.menuRepository.createQueryBuilder('menu')
      .innerJoin('menu.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .orderBy('menu.orderNumb')
      .getMany();
    const navList = [];
    menuList.forEach(menu => {
      if (menu.parentId === 0) {
        navList.push(menu);
      }
    });
    navList.forEach(nav => {
      if (nav.type === 0) {
        nav.submenus = menuList.filter(menu => menu.type === 1 && menu.parentId === nav.id);
      }
    });
    return { status: 'success', data: navList };
  }
}
