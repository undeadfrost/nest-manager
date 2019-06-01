import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Menu } from '../menu/menu.entity';

@Entity('sys_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: '用户名' })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ nullable: true, length: 11, comment: '手机号' })
  mobile: string;

  @Column({ default: 1, comment: '状态' })
  status: boolean;

  @Column({ nullable: true, comment: '头像' })
  portrait: string;

  @Column({ type: 'datetime', comment: '创建时间' })
  createTime: Date;

  @Column({ nullable: true, type: 'datetime', comment: '最后登录时间' })
  lastSignTime: Date;

  @ManyToMany(type => Menu)
  @JoinTable({
    name: 'sys_user_menu',
  })
  menu: Menu;
}
