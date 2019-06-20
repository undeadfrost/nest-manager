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

  /**
   * 获取角色对应菜单
   * @param roleIds
   */
  async findUserMenuByRole(roleIds: number[]): Promise<any> {
    return await this.menuRepository.createQueryBuilder('menu')
      .innerJoin('menu.roles', 'role')
      .where('role.id IN (:...roleIds)', { roleIds })
      .orderBy('menu.orderNum')
      .getMany();
  }

  /**
   * 根据ids array获取菜单列表
   * @param ids
   */
  findMenuByIds(ids: number[]): Promise<any> {
    return this.menuRepository.createQueryBuilder('menu')
      .where('menu.id IN (:...ids)', { ids: [...ids] })
      .getMany();
  }

  /**
   * 获取菜单列表
   */
  async findMenuAll(): Promise<any> {
    const menuList = await this.menuRepository.find({ order: { orderNum: 'ASC' } });
    const buttons = [];
    const menus = [];
    const navs = [];
    menuList.forEach((item, index) => {
      if (item.type === 2) {
        buttons.push(item);
      }
      if (item.type === 1) {
        menus.push(item);
      }
      if (!item.parentId) {
        navs.push(item);
      }
    })
    menus.forEach(menu => {
      buttons.forEach(button => {
        if(button.parentId === menu.id) {
          menu.children = button;
        }
      })
    })
    return navs;
  }
}
