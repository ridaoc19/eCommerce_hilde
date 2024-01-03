import { DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';
import { DepartmentEntity } from '../departments/entity';
import { ProductEntity } from '../products/entity';
import { SubcategoryEntity } from '../subcategories/entity';

@Entity('navigation')
export class NavigationEntity {
  @PrimaryGeneratedColumn("uuid")
  navigation_id: string;

  @ManyToOne(() => DepartmentEntity, department => department.navigations, { cascade: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => CategoryEntity, category => category.navigations, { cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.navigations, { cascade: true })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: SubcategoryEntity;

  @ManyToOne(() => ProductEntity, product => product.navigations, { cascade: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  
  // @ManyToOne(() => VariantEntity, variant => variant.navigations, { cascade: true })
  // @JoinColumn({ name: 'variant_id' })
  // variant: VariantEntity;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

