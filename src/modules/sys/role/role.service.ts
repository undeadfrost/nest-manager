import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { User } from '../user/user.entity';

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
}
