import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VariantEntity } from '../variants/entity';
import { SubcategoryEntity } from '../subcategories/entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: string;

  @Column({ type: 'varchar' })
  product: string;

  @Column()
  brand: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  specification: Record<string, string>;

  @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.products, { cascade: true })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: SubcategoryEntity;

  @OneToMany(() => VariantEntity, variant => variant.product, { cascade: ['soft-remove', 'recover'] })
  variants: VariantEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}

