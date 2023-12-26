import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEntity } from '../departments/entity';
import { SubcategoryEntity } from '../subcategories/entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: string;

  @Column({ type: 'varchar' })
  category: string;

  @ManyToOne(() => DepartmentEntity, department => department.categories, { cascade: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @OneToMany(() => SubcategoryEntity, subcategory => subcategory.category, { cascade: ['soft-remove', 'recover'] })
  subcategories: SubcategoryEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
