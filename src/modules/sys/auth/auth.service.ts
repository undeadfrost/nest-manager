import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Base64 } from 'js-base64';
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
   * 密码编码
   * @param password
   */
  private decodeBase64(password: string) {
    return password ? Base64.decode(password) : password;
  }

  /**
   * MD5编码
   * @param password
   */
  private decodeSha1(password: string) {
    return createHash('sha1').update(password).digest('hex');
  }

  createToken(username: string): string {
    const user: JwtPayload = { username };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByUsername(payload.username);
  }

  async checkPassword(username: string, passowrd: string): Promise<any> {
    const sha1Password = this.decodeSha1(username + passowrd);
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === sha1Password) {
      return user;
    } else {
      return false;
    }
  }

  async createUser(authRegisterDto: AuthRegisterDto): Promise<any> {
    const { username, password } = authRegisterDto;
    const existUser = await this.userService.findOneByUsername(username);
    if (existUser) {
      throw new HttpException('用户名已存在！', HttpStatus.CONFLICT);
    }
    const user = new User();
    user.username = username;
    user.password = this.decodeSha1(username + password);
    user.createTime = new Date();
    await this.userService.saveUser(user);
    return { status: 'success', message: '创建用户成功,请妥善保管信息！' };
  }

  async loginUser(authLoginDto: AuthLoginDto): Promise<any> {
    const { username, password } = authLoginDto;
    const user = await this.checkPassword(username, password);
    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.UNAUTHORIZED);
    }
    user.lastSignTime = new Date();
    this.userService.saveUser(user);
    const token = this.createToken(username);
    return { status: 'success', date: { token: token }, message: '登陆成功！' };
  }
}
