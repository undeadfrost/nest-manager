import { ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { MenuService } from '../modules/sys/menu/menu.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    @Inject('MenuService')
    private readonly menuService: MenuService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const can = await super.canActivate(context);
    const permission = this.reflector.get<string>('permission', context.getHandler());
    if (can && permission) {
      console.log(permission);
      console.log(this.menuService);
    }
    const x = await this.menuService.findUserMenuByRole([1, 2]);
    console.log(x);
    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException(info && info.message);
    }
    return user;
  }
}
