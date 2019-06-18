import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), MenuModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})

export class RoleModule {
}
