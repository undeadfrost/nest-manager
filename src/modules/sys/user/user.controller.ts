import { Controller, Get, Post, UseGuards, Query, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth, ApiModelProperty, ApiImplicitQuery } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateUserDto, UpdateUserDto, GetUserDto } from './user.dto';
import { RoleService } from '../role/role.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUseTags('user')
@Controller('/sys/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService) {
  }

  @ApiOperation({ title: '获取用户列表', description: '权限标识 sys:user:list' })
  @Get()
  @Permission('sys:user:list')
  getUserAll(@Query() getUserDto: GetUserDto) {
    return this.userService.findUserAll(getUserDto);
  }

  @ApiOperation({ title: '新建用户', description: '权限标识 sys:user:create' })
  @Post()
  @Permission('sys:user:create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const roleIds = createUserDto.roleIds;
    const roles = await this.roleService.findRoleByIds(roleIds);
    await this.userService.createUser(createUserDto, roles);
    return { status: 'success', message: '创建用户成功！' };
  }

  @ApiOperation({ title: '删除单个用户', description: '权限标识 sys:user:delete' })
  @Delete(':id')
  @Permission('sys:user:delete')
  async delUserOne(@Param('id') id: number) {
    await this.userService.delUserOne(id);
    return { status: 'success', message: '删除用户成功！' };
  }

  @ApiOperation({ title: '修改用户信息', description: '权限标识 sys:user:update' })
  @Put(':id')
  @Permission('sys:user:update')
  async putUserInfo(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.putUserInfo(id, updateUserDto);
    return { status: 'success', message: '修改用户信息成功！' };
  }
}
