import { Column, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';
import { DepartmentEntity } from '../departments/entity';
import { ProductEntity } from '../products/entity';
import { SubcategoryEntity } from '../subcategories/entity';
import { VariantEntity } from '../variants/entity';


@Entity('media_files')
export class MediaFilesEntity {
  @PrimaryGeneratedColumn("uuid")
  media_id: string;

  @Column({ type: 'simple-array', default: [] })
  images: string[];

  @Column({ type: 'simple-array', default: [] })
  videos: string[];

  @OneToOne(() => DepartmentEntity, department => department.media, { cascade: ['soft-remove', 'recover'] })
  department: DepartmentEntity;

  @OneToOne(() => CategoryEntity, category => category.media, { cascade: ['soft-remove', 'recover'] })
  category: CategoryEntity;

  @OneToOne(() => SubcategoryEntity, subcategory => subcategory.media, { cascade: ['soft-remove', 'recover'] })
  subcategory: SubcategoryEntity;

  @OneToOne(() => ProductEntity, product => product.media, { cascade: ['soft-remove', 'recover'] })
  product: ProductEntity;

  @OneToOne(() => VariantEntity, variant => variant.media, { cascade: ['soft-remove', 'recover'] })
  variant: VariantEntity;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}