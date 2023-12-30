import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';
import { NavigationEntity } from '../navigation/entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn("uuid")
  department_id: string;

  @Column({ type: 'varchar' })
  department: string;

  @OneToMany(() => CategoryEntity, category => category.department, { cascade: ['soft-remove', 'recover'] })
  categories: CategoryEntity[];

  @OneToMany(() => NavigationEntity, navigation => navigation.department, { cascade: ['soft-remove', 'recover', 'insert', 'update'] })
  navigations: NavigationEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
