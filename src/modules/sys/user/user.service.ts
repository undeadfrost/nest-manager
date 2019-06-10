import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

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

  async findAllUsername(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
