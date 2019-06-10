import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { MenuService } from '../menu/menu.service';
import { User } from '../user/user.entity';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService) {
  }

  /**
   * 随机盐值生成
   * @return 6位数字
   */
  private getRandomSalt(): string {
    return Math.random().toString().slice(2, 8);
  }

  /**
   * MD5编码
   * @param password
   * @return MD5编码之后数据
   */
  private decodeMd5(password: string): string {
    return createHash('md5').update(password).digest('hex');
  }

  /**
   * 密码加密
   * @param password
   * @param salt
   */
  private cryptPassword(password: string, salt: string): string {
    return this.decodeMd5(`${password}@@${salt}`);
  }

  /**
   * 创建jwt令牌
   * @param username
   */
  async createToken(username: string) {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  /**
   * 校验jwt载荷中信息
   * @param payload
   */
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByUsername(payload.username);
  }

  /**
   * 用户登录
   * @param authLoginDto
   */
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

  /**
   * 创建用户
   * @param authRegisterDto
   */
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
    return this.userService.saveUser(user);
  }

  /**
   * 获取用户权限对应菜单
   * @param user
   */
  async getUserMenu(user: User): Promise<any> {
    const roles = await this.roleService.findUserRole(user);
    if (roles.length === 0) { // 用户没有角色是直接返回空
      return [];
    }
    const roleIds: number[] = [];
    for (const role of roles) {
      roleIds.push(role.id);
    }
    return await this.menuService.findUserMenuByRole(roleIds);
  }

  /**
   * 获取格式化后前端导航数据
   * @param user
   */
  async getUserNav(user: User): Promise<any[]> {
    let menus = await this.getUserMenu(user);
    menus = menus.filter(item => item.type !== 2);
    const navs = menus.filter(item => item.parentId === null);
    navs.forEach(item => {
      if (item.type === 0) {
        item.submenus = menus.filter(menu => menu.type === 1 && menu.parentId === item.id);
      }
    });
    return navs;
  }

  /**
   * 获取全部权限标识
   * @param user
   */
  async getUserPermissions(user: User): Promise<any> {
    const menus = await this.getUserMenu(user);
    const permissions: string[] = [];
    menus.map(menu => menu.permission && permissions.push(menu.permission));
    return permissions;
  }
}
