import { BeforeInsert, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryEntity from '../category/entity';
import DepartmentEntity from '../department/entity';
import ProductEntity from '../product/entity';
import SubcategoryEntity from '../subcategory/entity';
import VariantEntity from '../variant/entity';
import { objectString, stringEmpty } from '../../core/utils/functionsGlobal';

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
  // @BeforeUpdate()
  updateSearch() {
    // .replace(/[^a-zA-Z0-9 ]/g, ' ') Reemplaza los caracteres no alfanuméricos por espacios antes de aplicar to_tsvector
    // const cleanedProduct = this.product.product.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // const cleanedBrand = this.product.brand.replace(/[^a-zA-Z0-9 ]/g, ' ');
    this.search = `${this.product.product} ${this.product.brand}`;
  }

  @BeforeInsert()
  // @BeforeUpdate()
  updateFilter() {
    // Obtener valores a agregar al filtro
    const departmentValue = `department${stringEmpty(this.department.department)}`;
    const categoryValue = `category${stringEmpty(this.category.category)}`;
    const subcategoryValue = `subcategory${stringEmpty(this.subcategory.subcategory)}`;
    const brandValue = `brand${stringEmpty(this.product.brand)}`;
    const specificationsValues = objectString(this.product.specifications);
    const attributesValues = this?.variants && this.variants.length > 0 ? this.variants.reduce((acc, item) => {
      if (Object.keys(item.attributes).length > 0) {
        return `${acc} ${objectString(item.attributes)}`
      }
      return acc
    }, '') : ''

    // Agregar nuevos valores al filtro
    this.filter = `
    ${departmentValue}
    ${categoryValue}
    ${subcategoryValue}
    ${brandValue}
    ${specificationsValues}
    ${attributesValues}
    `.trim();
  }
}