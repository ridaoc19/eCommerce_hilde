import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NavigationEntity } from '../navigation/entity';
import { ProductEntity } from '../products/entity';

@Entity('variants')
export class VariantEntity {
  @PrimaryGeneratedColumn("uuid")
  variant_id: string;

  @Column('simple-array')
  images: string[];

  @Column({ type: 'jsonb' })
  attributes: Record<string, string>;

  @Column('simple-array')
  videos: string[];

  @Column('float')
  price: number;

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
}

