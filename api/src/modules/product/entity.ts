import { BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import NavigationEntity from '../navigation/entity';
import SubcategoryEntity from '../subcategory/entity';
import VariantEntity from '../variant/entity';
import { objectString, stringEmpty } from '../../core/utils/navigation/functions';
import { AppDataSource } from '../../core/db/postgres';

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

  @Column('varchar', { array: true })
  benefits: string[];

  @Column({ type: 'text' })
  contents: string;

  @Column({ type: 'text' })
  warranty: string;

  @Column({ type: 'jsonb' })
  specifications: Record<string, string>;

  @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.products, { cascade: true })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: SubcategoryEntity;

  @OneToMany(() => VariantEntity, variant => variant.product, { cascade: ['soft-remove', 'recover'] })
  variants: VariantEntity[];

  @OneToMany(() => NavigationEntity, navigation => navigation.product, { cascade: ['soft-remove', 'recover'] })
  navigations: NavigationEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @BeforeUpdate()
  async updateFilter() {
    // Obtén el repositorio de NavigationEntity
    const navigationRepository = AppDataSource.getRepository(NavigationEntity);

    // Obtén el producto actualizado
    const updatedProduct = await navigationRepository.findOne({ where: { product: { product_id: this.product_id } }, relations: { department: true, category: true, subcategory: true, variants: true } });

    // Verifica si se encontró el producto
    if (updatedProduct) {
      const departmentValue = `department${stringEmpty(updatedProduct.department.department)}`;
      const categoryValue = `category${stringEmpty(updatedProduct.category.category)}`;
      const subcategoryValue = `subcategory${stringEmpty(updatedProduct.subcategory.subcategory)}`;
      const brandValue = `brand${stringEmpty(this.brand)}`;
      const specificationsValues = objectString(this.specifications);
      const attributesValues = updatedProduct?.variants && updatedProduct.variants.length > 0 ? updatedProduct.variants.reduce((acc, item) => {
        if (Object.keys(item.attributes).length > 0) {
          return `${acc} ${objectString(item.attributes)}`
        }
        return acc
      }, '') : ''

      // Agregar nuevos valores al filtro
      const filter = `
    ${departmentValue}
    ${categoryValue}
    ${subcategoryValue}
    ${brandValue}
    ${specificationsValues}
    ${attributesValues}
    `.trim();

      // Actualiza el filtro en la navegación
      updatedProduct.filter = filter;
      updatedProduct.search = `${this.product} ${this.brand}`;


      // Guarda los cambios en la base de datos
      await navigationRepository.save(updatedProduct);

      // console.log(updatedProduct, 'entro')
    }
  }
}

