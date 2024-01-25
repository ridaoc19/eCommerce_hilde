import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEntity } from '../departments/entity';
import { MediaFilesEntity } from '../media/entity';
import { NavigationEntity } from '../navigation/entity';
import { SubcategoryEntity } from '../subcategories/entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  category_id: string;

  @Column({ type: 'varchar' })
  category: string;

  @OneToOne(() => MediaFilesEntity, media => media.category, { cascade: true })
  @JoinColumn({ name: 'media_id' })
  media: MediaFilesEntity;

  @ManyToOne(() => DepartmentEntity, department => department.categories, { cascade: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @OneToMany(() => SubcategoryEntity, subcategory => subcategory.category, { cascade: ['soft-remove', 'recover'] })
  subcategories: SubcategoryEntity[];

  @OneToMany(() => NavigationEntity, navigation => navigation.category, { cascade: ['soft-remove', 'recover'] })
  navigations: NavigationEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
