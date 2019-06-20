import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
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
    if (err || !user) {
      throw err || new UnauthorizedException(info && info.message);
    }
    const { exp } = user.payload;
    const timestamp = Math.round(Date.now() / 1000);
    if ((exp - timestamp) < 900) {
      const response = context.switchToHttp().getResponse();
      const accessToken = this.jwtService.sign({ username: user.username }); // 获取新Token
      response.setHeader('newToken', accessToken);
    }
    return user;
  }
}
