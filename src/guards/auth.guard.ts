import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const can = await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const permission = this.reflector.get<string>('permission', context.getHandler());
    if (can && permission) {
      return request.user.permissions.includes(permission);
    }
    return can;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const response = context.switchToHttp().getResponse();
    response.xxxxxx = 'x';
    console.log(info);
    if (err || !user) {
      throw err || new UnauthorizedException(info && info.message);
    }
    return user;
  }
}
