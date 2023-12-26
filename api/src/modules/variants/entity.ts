import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../products/entity';

@Entity('variants')
export class VariantEntity {
  @PrimaryGeneratedColumn()
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

  @DeleteDateColumn()
  deletedAt: Date;
}

