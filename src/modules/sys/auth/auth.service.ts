import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService) {
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

  async createUser(user: User): Promise<any> {
    const existUser = await this.userService.findOneByUsername(user.username);
    if (existUser) {
      throw new HttpException('用户名已存在！', HttpStatus.CONFLICT);
    }
    user.createTime = new Date();
    return this.userService.saveUser(user);
  }
}
