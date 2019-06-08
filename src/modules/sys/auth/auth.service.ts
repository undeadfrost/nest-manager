import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { AuthRegisterDto, AuthLoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService) {
  }

  /**
   * 随机盐值生成
   */
  private getRandomSalt(): string {
    return Math.random().toString().slice(2, 8);
  }

  /**
   * MD5编码
   * @param password
   */
  private decodeMd5(password: string): string {
    return createHash('md5').update(password).digest('hex');
  }

  private cryptPassword(password: string, salt: string): string {
    return this.decodeMd5(`${password}@@${salt}`);
  }

  async createToken(username: string) {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByUsername(payload.username);
  }

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { username, password } = authLoginDto;
    const user: User = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new HttpException('用户名不存在!', HttpStatus.UNAUTHORIZED);
    }
    const encryptPassword: string = this.cryptPassword(password, user.salt);
    if (user.password !== encryptPassword) {
      throw new HttpException('密码错误!', HttpStatus.UNAUTHORIZED);
    }
    return this.createToken(username);
  }

  async createUser(authRegisterDto: AuthRegisterDto): Promise<any> {
    const { username, password } = authRegisterDto;
    const existUser: User = await this.userService.findOneByUsername(username);
    if (existUser) { // 判断用户名是否已经被注册
      throw new HttpException('用户名已存在！', HttpStatus.CONFLICT);
    }
    const salt: string = this.getRandomSalt();
    const user: User = new User();
    user.username = username;
    user.salt = salt;
    user.password = this.cryptPassword(password, salt);
    user.createTime = new Date();
    await this.userService.saveUser(user);
    return { status: 'success', message: '创建用户成功,请妥善保管信息！' };
  }
}
