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
}
