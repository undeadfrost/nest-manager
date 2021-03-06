import {
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Body,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiUseTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../guards/auth.guard';
import { UserService } from './user.service';
import { Permission } from '../../../decorator/permission.decorator';
import { CreateUserDto, UpdateUserDto, GetUserDto, ChangePasswordDto } from './user.dto';
import { RoleService } from '../role/role.service';
import { User } from '../../../decorator/user.decorator';
import { User as UserEntity } from './user.entity';
import { multerOptions } from '../../../common/multer';

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
  async getUserAll(@Query() getUserDto: GetUserDto) {
    const userList: [] = await this.userService.findUserAll(getUserDto);
    return { status: 'success', data: userList };
  }

  @ApiOperation({ title: '获取用户信息', description: '权限标识 sys:user:info' })
  @Get(':id')
  @Permission('sys:user:info')
  async getUserInfo(@Param('id') id: number) {
    const userInfo = await this.userService.getUserInfo(id);
    return { status: 'success', data: userInfo };
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

  @ApiOperation({ title: '用户个人头像上传' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: '头像图片' })
  @Post('uploadPortrait')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadPortrait(@User() user: UserEntity, @UploadedFile() file: any) {
    await this.userService.uploadPortrait(user, file);
    return { status: 'success', message: '头像上传成功！' };
  }

  @ApiOperation({ title: '修改个人密码' })
  @Post('security')
  async changePassword(@User() user: UserEntity, @Body() changePasswordDto: ChangePasswordDto) {
    await this.userService.changePassword(user, changePasswordDto);
    return { status: 'success', message: '修改密码成功！' };
  }
}
