import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_resource')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '接口地址' })
  api: string;

  @Column({ comment: '名称', length: 100 })
  name: string;

  @Column({ comment: '请求类型', length: 10 })
  method: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;
}
