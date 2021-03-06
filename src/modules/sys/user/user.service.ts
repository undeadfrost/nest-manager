import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { CreateUserDto, UpdateUserDto, GetUserDto, ChangePasswordDto } from './user.dto';
import * as utils from '../../../common/utils';
import { User as UserEntity } from './user.entity';
import { cryptPassword } from '../../../common/utils';

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
  findUserAll(getUserDto: GetUserDto): Promise<any> {
    const { pageNum, pageSize } = getUserDto;
    return this.userRepository.find({
      select: ['id', 'username', 'email', 'mobile', 'status', 'createTime', 'lastSignTime'],
      skip: (pageNum - 1) || 0,
      take: pageSize || 10,
    });
  }

  /**
   * 创建用户(包含用户角色)
   * @param createUserDto
   * @param roles
   */
  async createUser(createUserDto: CreateUserDto, roles: Role[]): Promise<any> {
    const { username, password, email, mobile, status } = createUserDto;
    const existUser: User = await this.findOneByUsername(username);
    if (existUser) { // 判断用户名是否已经被注册
      throw new HttpException('用户名已存在！', HttpStatus.CONFLICT);
    }
    const salt: string = utils.getRandomSalt();
    const user: User = new User();
    user.username = username;
    user.salt = salt;
    user.password = utils.cryptPassword(password, salt);
    user.email = email;
    user.mobile = mobile;
    user.status = status;
    user.createTime = new Date();
    user.roles = roles;
    return this.saveUser(user);
  }

  /**
   * 删除指定用户
   * @param userId
   */
  delUserOne(userId: number): Promise<any> {
    return this.userRepository.delete(userId);
  }

  /**
   * 更新用户信息
   * @param userId
   * @param updateUserDto
   */
  putUserInfo(userId: number, updateUserDto: UpdateUserDto): Promise<any> {
    if (!updateUserDto.password) {
      delete updateUserDto.password;
    }
    return this.userRepository.createQueryBuilder()
      .update(User)
      .set({ ...updateUserDto })
      .where('id = :id', { id: userId })
      .execute();
  }

  /**
   * 更新用户登陆时间
   * @param userId
   */
  updateUserLastSignTime(userId: number): Promise<any> {
    return this.userRepository.createQueryBuilder()
      .update(User)
      .set({ lastSignTime: new Date() })
      .where('id = :id', { id: userId })
      .execute();
  }

  /**
   * 获取用户信息
   * @param userId
   */
  getUserInfo(userId: number): Promise<any> {
    return this.userRepository.createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .addSelect(['role.id', 'role.name', 'role.remark'])
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  uploadPortrait(user: UserEntity, file: any): Promise<any> {
    return this.userRepository.createQueryBuilder()
      .update(User)
      .set({ portrait: `/public/uploads/${file.filename}` })
      .where('id = :id', { id: user.id })
      .execute();
  }

  changePassword(user: UserEntity, changePasswordDto: ChangePasswordDto): Promise<any> {
    const { password, confirmPassword } = changePasswordDto;
    if (password !== confirmPassword) {
      throw new HttpException('密码不一致！', HttpStatus.BAD_REQUEST);
    }
    const salt: string = utils.getRandomSalt();
    const encryptionPassword = utils.cryptPassword(password, salt);
    return this.userRepository.createQueryBuilder()
      .update(User)
      .set({ password: encryptionPassword, salt })
      .where('id = :id', { id: user.id })
      .execute();
  }
}
