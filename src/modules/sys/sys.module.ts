import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitys/user.entity';
import { Photo } from './entitys/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])]
})

export class SysModule { }
