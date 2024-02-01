import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import MediaFilesEntity from '../media/entity';
import NavigationEntity from '../navigation/entity';
import SubcategoryEntity from '../subcategories/entity';
import VariantEntity from '../variants/entity';

@Entity('products')
export default class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  product_id: string;

  @Column({ type: 'varchar' })
  product: string;

  @Column()
  brand: string;

  @Column({ type: 'text' })
  description: string;

  @Column('simple-array')
  benefits: string[];

  @Column({ type: 'text' })
  contents: string;

  @Column({ type: 'text' })
  warranty: string;

  @Column({ type: 'jsonb' })
  specifications: Record<string, string>;

  @OneToOne(() => MediaFilesEntity, media => media.product, { cascade: true })
  @JoinColumn({ name: 'media_id' })
  media: MediaFilesEntity;

  @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.products, { cascade: true })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: SubcategoryEntity;

  @OneToMany(() => VariantEntity, variant => variant.product, { cascade: ['soft-remove', 'recover'] })
  variants: VariantEntity[];

  @OneToMany(() => NavigationEntity, navigation => navigation.product, { cascade: ['soft-remove', 'recover'] })
  navigations: NavigationEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

