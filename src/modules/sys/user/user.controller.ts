import { Controller, Get, Post, UseGuards, Query, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateUserDto } from './user.dto';
import { RoleService } from '../role/role.service';

@ApiUseTags('user')
@Controller('/sys/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService) {
  }

  @ApiOperation({title: '获取用户列表'})
  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:user:list')
  findUserAll() {
    return this.userService.findUserAll();
  }

  @ApiOperation({title: '新建用户'})
  @Post()
  @UseGuards(JwtAuthGuard)
  @Permission('sys:user:create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const roleIds = createUserDto.roleIds;
    const roles = await this.roleService.findRoleByIds(roleIds);
    await this.userService.createUser(createUserDto, roles);
    return { status: 'success', message: '创建用户成功！' };
  }
}
