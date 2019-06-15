import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { CreateUserDto } from './user.dto';
import * as utils from '../../../common/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  /**
   * 根据用户名查找用户
   * @param username
   */
  findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * 保存用户
   * @param user
   */
  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * 获取用户列表
   */
  findUserAll(): Promise<any> {
    return this.userRepository.find({ select: ['id', 'username', 'email', 'mobile', 'status', 'createTime', 'lastSignTime'] });
  }

  /**
   * 创建用户(包含用户角色)
   * @param createUserDto
   * @param roles
   */
  async createUser(createUserDto: CreateUserDto, roles: Role[]): Promise<any> {
    const { username, password } = createUserDto;
    const existUser: User = await this.findOneByUsername(username);
    if (existUser) { // 判断用户名是否已经被注册
      throw new HttpException('用户名已存在！', HttpStatus.CONFLICT);
    }
    const salt: string = utils.getRandomSalt();
    const user: User = new User();
    user.username = username;
    user.salt = salt;
    user.password = utils.cryptPassword(password, salt);
    user.createTime = new Date();
    user.roles = roles;
    return this.saveUser(user);
  }
}
