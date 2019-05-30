import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true, comment: '用户名' })
  username: string;

  @Column({ nullable: true, comment: '密码' })
  password: string;

  @Column({ length: 11, comment: '手机号' })
  mobile: string;

  @Column({ nullable: true, default: 1, comment: '状态' })
  status: boolean;

  @Column({ comment: '头像' })
  portrait: string;

  @Column({ nullable: true, type: 'datetime' })
  createTime: Date;

  @Column({ type: 'datetime' })
  lastSignTime: Date
}
