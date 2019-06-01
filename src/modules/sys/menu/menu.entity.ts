import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Resource } from '../resource/resource.entity';

@Entity('sys_menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, comment: '菜单名' })
  name: string;

  @Column({ nullable: true, comment: '路由' })
  router: string;

  @Column({ type: 'int', comment: '父级目录ID' })
  parentId: number;

  @Column({ nullable: true, comment: '信息' })
  description: string;

  @Column({ type: 'int', comment: '类型 0顶级目录,1子菜单,2隐藏菜单' })
  type: number;

  @Column({ nullable: true, comment: '目录图标' })
  icon: string;

  @Column({ nullable: true, comment: '菜单排序' })
  orderNumb: number;

  @ManyToMany(type => Resource)
  @JoinTable({
    name: 'sys_menu_resource',
  })
  resource: Resource;
}
