import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../products/entity';
import { NavigationEntity } from '../navigation/entity';

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

  @OneToMany(() => NavigationEntity, navigation => navigation.variant, { cascade: ['soft-remove', 'recover'] })
  navigations: NavigationEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

