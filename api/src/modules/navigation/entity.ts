import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { objectString, stringEmpty } from '../../core/utils/navigation/functions';
import CategoryEntity from '../categories/entity';
import DepartmentEntity from '../department/entity';
import ProductEntity from '../products/entity';
import SubcategoryEntity from '../subcategories/entity';
import VariantEntity from '../variants/entity';

@Entity('navigation')
export default class NavigationEntity {
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

  @Column() // Select false evita que la columna aparezca en las consultas por defecto
  search: string;

  @Column({ type: 'tsvector' }) // Select false evita que la columna aparezca en las consultas por defecto
  filter: string;

  @Column({ default: 0, select: false }) // Select false evita que la columna aparezca en las consultas por defecto
  product_view: number;

  @OneToMany(() => VariantEntity, variant => variant.navigation, { cascade: ['soft-remove', 'recover'] })
  variants: VariantEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateSearch() {
    // .replace(/[^a-zA-Z0-9 ]/g, ' ') Reemplaza los caracteres no alfanuméricos por espacios antes de aplicar to_tsvector
    // const cleanedProduct = this.product.product.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // const cleanedBrand = this.product.brand.replace(/[^a-zA-Z0-9 ]/g, ' ');
    this.search = `${this.product.product} ${this.product.brand}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateFilter() {
    this.filter = `
    department${stringEmpty(this.department.department)}
    category${stringEmpty(this.category.category)}
    subcategory${stringEmpty(this.subcategory.subcategory)}
    brand${stringEmpty(this.product.brand)}
    ${objectString(this.product.specifications)}
    `;
  }
}