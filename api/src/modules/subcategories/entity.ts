import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';
import { ProductEntity } from '../products/entity';

@Entity('subcategories')
export class SubcategoryEntity {
  @PrimaryGeneratedColumn()
  subcategory_id: string;

  @Column({ type: 'varchar' })
  subcategory: string;

  @ManyToOne(() => CategoryEntity, category => category.subcategories, { cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, product => product.subcategory, { cascade: ['soft-remove', 'recover'] })
  products: ProductEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
