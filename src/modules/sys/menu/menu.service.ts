import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { Menu } from './menu.entity';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

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
    });
    // 组织菜单及按钮
    menus.forEach(menu => {
      menu.children = [];
      buttons.forEach(button => {
        if (menu.id === button.parentId) {
          menu.children.push(button);
        }
      });
    });
    // 组织目录及菜单
    navs.forEach(nav => {
      if (nav.type === 1) {
        return;
      } // 如果为顶级菜单则直接跳过本次循环
      nav.children = [];
      menus.forEach(menu => {
        if (nav.id === menu.parentId) {
          nav.children.push(menu);
        }
      });
    });
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

  /**
   * 新建菜单
   * @param createMenuDto
   */
  async createMenu(createMenuDto: CreateMenuDto): Promise<any> {
    const { name, parentId, router } = createMenuDto;
    const existMenu: Menu = await this.menuRepository.findOne({ where: { name, type: Not(2) } });
    if (existMenu) {
      throw new HttpException('菜单名已存在', HttpStatus.CONFLICT);
    }
    // 查询父级菜单是否存在
    if (parentId) {
      const parentMenu = await this.menuRepository.findOne({ where: { parentId } });
      if (!parentMenu) {
        throw new HttpException('父级菜单不存在', HttpStatus.PRECONDITION_FAILED);
      }
      createMenuDto.parentName = parentMenu.name; // 添加父级菜单名
    }
    // 查询路由是否已存在
    if (router) {
      const routerMenu = await this.menuRepository.findOne({ where: { router } });
      if (routerMenu) {
        throw new HttpException('路由已被注册', HttpStatus.CONFLICT);
      }
    }
    return this.menuRepository.save(createMenuDto);
  }

  /**
   * 更新菜单信息
   * @param menuId
   * @param updateMenuDto 
   */
  async updateMenu(menuId: number, updateMenuDto: UpdateMenuDto): Promise<any> {
    const { name, parentId, router } = updateMenuDto;
    const existMenu: Menu = await this.menuRepository.findOne({ where: { name, type: Not(2), id: Not(menuId) } });
    if (existMenu) {
      throw new HttpException('菜单名已存在', HttpStatus.CONFLICT);
    }
    // 查询父级菜单是否存在
    if (parentId) {
      const parentMenu = await this.menuRepository.findOne({ where: { parentId } });
      if (!parentMenu) {
        throw new HttpException('父级菜单不存在', HttpStatus.PRECONDITION_FAILED);
      }
      updateMenuDto.parentName = parentMenu.name; // 添加父级菜单名
    }
    // 查询路由是否已存在
    if (router) {
      const routerMenu = await this.menuRepository.findOne({ where: { router } });
      if (routerMenu) {
        throw new HttpException('路由已被注册', HttpStatus.CONFLICT);
      }
    }
    return this.menuRepository.createQueryBuilder().update(Menu).set({ ...updateMenuDto }).where('id = :id', { id: menuId }).execute();
  }

  getMenuInfo(menuId: number): Promise<any> {
    return this.menuRepository.findOne(menuId);
  }
}
