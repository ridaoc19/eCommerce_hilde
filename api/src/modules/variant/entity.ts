import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { objectString } from '../../core/utils/navigation/functions';
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
    const variantAttributesString = objectString(this.attributes);

    // Si ya hay información en la propiedad filter, entonces concatena con un espacio adicional
    this.navigation.filter = `${this.navigation.filter || ''} ${variantAttributesString} `;
  }

}

