import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    const menuList = await this.menuRepository.find({ order: { orderNum: 'ASC' } }); // 数据库中菜单表所有数据
    const buttons = []; // type=2 按钮
    const menus = []; // type=1 菜单
    const navs = []; // parentId = null 顶级目录或菜单
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
    // 组织菜单及按钮
    menus.forEach(menu => {
      menu.children = [];
      buttons.forEach(button => {
        if (menu.id === button.parentId) {
          menu.children.push(button);
        }
      })
    })
    // 组织目录及菜单
    navs.forEach(nav => {
      if (nav.type === 1) return; // 如果为顶级菜单则直接跳过本次循环
      nav.children = [];
      menus.forEach(menu => {
        if (nav.id === menu.parentId) {
          nav.children.push(menu)
        }
      })
    })
    return navs;
  }

  /**
   * 删除菜单
   * @param menuId 
   */
  async delMenuOne(menuId: number): Promise<any> {
    const children: Menu[] = await this.menuRepository.find({ where: { parentId: menuId } });
    if (children.length > 0) {
      throw new HttpException('请先删除子菜单或者按钮', HttpStatus.PRECONDITION_FAILED);
    }
    return this.menuRepository.delete(menuId);
  }
}
