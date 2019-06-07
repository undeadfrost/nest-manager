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
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new HttpException('用户名不存在!', HttpStatus.UNAUTHORIZED);
    }
    const encryptPassword = this.decodeSha1(username + password);
    if (user.password !== encryptPassword) {
      throw new HttpException('密码错误!', HttpStatus.UNAUTHORIZED);
    }
    return this.createToken(username);
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
}
