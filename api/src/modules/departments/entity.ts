import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  department_id: string;

  @Column({ type: 'varchar' })
  department: string;

  @OneToMany(() => CategoryEntity, category => category.department, { cascade: ['soft-remove', 'recover'] })
  categories: CategoryEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
