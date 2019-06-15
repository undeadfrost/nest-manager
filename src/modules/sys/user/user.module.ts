import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { MenuModule } from '../menu/menu.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MenuModule, RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {
}
