import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity('sys_menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, comment: '菜单名' })
  name: string;

  @Column({ nullable: true, comment: '路由' })
  router: string;

  @Column({ nullable: true, type: 'int' })
  parentId: number;

  @Column({ nullable: true, comment: '父级菜单名称' })
  parentName: string;

  @Column({ type: 'int', comment: '类型 0目录,1菜单,2权限' })
  type: number;

  @Column({ nullable: true, comment: '权限标识' })
  permission: string;

  @Column({ nullable: true, comment: '目录图标' })
  icon: string;

  @Column({ nullable: true, comment: '描述' })
  description: string;

  @Column({ nullable: true, comment: '菜单排序' })
  orderNum: number;

  @ManyToMany(type => Role, role => role.menus)
  roles: Role[];
}
