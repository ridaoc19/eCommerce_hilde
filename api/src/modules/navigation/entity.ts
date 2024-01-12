import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';
import { DepartmentEntity } from '../departments/entity';
import { ProductEntity } from '../products/entity';
import { SubcategoryEntity } from '../subcategories/entity';
import { VariantEntity } from '../variants/entity';

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

  @Column({ type: 'tsvector', select: false }) // Select false evita que la columna aparezca en las consultas por defecto
  search: string;

  @OneToMany(() => VariantEntity, variant => variant.navigation, { cascade: ['soft-remove', 'recover'] })
  variants: VariantEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateSearchVector() {
    const cleanedProduct = this.product.product.replace(/[^a-zA-Z0-9 ]/g, ' ');
    const cleanedBrand = this.product.brand.replace(/[^a-zA-Z0-9 ]/g, ' ');
    this.search = `${cleanedProduct} ${cleanedBrand}`;
  }
}