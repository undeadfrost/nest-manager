import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { User } from '../user/user.entity';
import { CreateRoleDto } from './role.dto';
import { Menu } from '../menu/menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
  }

  /**
   * 获取用户对应角色
   * @param user
   */
  async findUserRole(user: User): Promise<any> {
    return await this.roleRepository.createQueryBuilder('role')
      .innerJoin('role.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  findRoleAll(): Promise<any> {
    return this.roleRepository.find();
  }

  /**
   * 通过ids array获取角色列表
   * @param ids
   */
  findRoleByIds(ids: number[]): Promise<any> {
    return this.roleRepository.createQueryBuilder('role')
      .where('role.id IN (:...ids)', { ids: [...ids] })
      .getMany();
  }

  async createRole(createRoleDto: CreateRoleDto, menus: Menu[]): Promise<any> {
    const roleName: string = createRoleDto.name;
    const existRole = await this.findOneByRoleName(roleName);
    if (existRole) {
      throw new HttpException('角色名已存在', HttpStatus.CONFLICT);
    }
    const role = new Role();
    role.name = roleName;
    role.remark = createRoleDto.remark;
    role.createTime = new Date();
    role.menus = menus;
    return this.roleRepository.save(role);
  }

  findOneByRoleName(name: string): Promise<any> {
    return this.roleRepository.findOne({ where: { name } });
  }

  delOneRole(roleId: number): Promise<any> {
    return this.roleRepository.delete(roleId);
  }
}
