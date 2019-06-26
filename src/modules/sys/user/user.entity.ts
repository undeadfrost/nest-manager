import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

import { Role } from '../role/role.entity';

@Entity('sys_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true, comment: '用户名' })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '盐(密码加密)' })
  salt: string;

  @Column({ nullable: true, comment: '电子邮箱' })
  email: string;

  @Column({ nullable: true, length: 11, comment: '手机号' })
  mobile: string;

  @Column({ default: 0, comment: '状态, 1:启用、0:禁用, 默认为禁用状态' })
  status: boolean;

  @Column({ nullable: true, comment: '头像' })
  portrait: string;

  @Column({ type: 'datetime', comment: '创建时间' })
  createTime: Date;

  @Column({ nullable: true, type: 'datetime', comment: '最后登录时间' })
  lastSignTime: Date;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({
    name: 'sys_user_role',
  })
  roles: Role[];
}
