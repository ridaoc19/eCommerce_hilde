import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { objectString, stringEmpty } from '../../core/utils/navigation/functions';
import NavigationEntity from '../navigation/entity';
import ProductEntity from '../product/entity';

@Entity('variants')
export default class VariantEntity {
  @PrimaryGeneratedColumn("uuid")
  variant_id: string;

  @Column('varchar', { array: true })
  images: string[];

  @Column({ type: 'jsonb' })
  attributes: Record<string, string>;

  @Column('varchar', { array: true })
  videos: string[];

  @Column('float')
  price: number;

  @Column('float')
  listPrice: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => ProductEntity, product => product.variants, { cascade: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => NavigationEntity, navigation => navigation.variants, { cascade: true })
  @JoinColumn({ name: 'navigation_id' })
  navigation: NavigationEntity;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateFilter() {
    // const variantAttributesString = objectString(this.attributes);

    // Obtener valores a agregar al filtro
    const departmentValue = `department${stringEmpty(this.product.subcategory.category.department.department)}`;
    const categoryValue = `category${stringEmpty(this.product.subcategory.category.category)}`;
    const subcategoryValue = `subcategory${stringEmpty(this.product.subcategory.subcategory)}`;
    const brandValue = `brand${stringEmpty(this.product.brand)}`;
    const specificationsValues = objectString(this.product.specifications);
    const attributesValues = this?.product.variants && this.product.variants.length > 0 ? this.product.variants.reduce((acc, item) => {
      if (Object.keys(item.attributes).length > 0) {
        return `${acc} ${objectString(item.attributes)}`
      }
      return acc
    }, '') : ''

    // Agregar nuevos valores al filtro
    this.navigation.filter = `
        ${departmentValue}
        ${categoryValue}
        ${subcategoryValue}
        ${brandValue}
        ${specificationsValues}
        ${attributesValues}
        `.trim();
  }

  // Si ya hay información en la propiedad filter, entonces concatena con un espacio adicional
  // this.navigation.filter = `${this.navigation.filter || ''} ${variantAttributesString} `;
  // }

}

