import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Menu } from '../menu/menu.entity';

@Entity('sys_role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;

  @Column({ type: 'datetime', comment: '创建时间' })
  createTime: Date;

  @ManyToMany(type => User, user => user.roles)
  users: User[];

  @ManyToMany(type => Menu, menu => menu.roles)
  @JoinTable({
    name: 'sys_role_menu',
  })
  menus: Menu[];
}
