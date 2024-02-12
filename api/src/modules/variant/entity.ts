import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import NavigationEntity from '../navigation/entity';
import ProductEntity from '../product/entity';
import { AppDataSource } from '../../core/db/postgres';
import { objectString, stringEmpty } from '../../core/utils/navigation/functions';

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
  async insertFilter() {
    // Obtén el repositorio de NavigationEntity
    const navigationRepository = AppDataSource.getRepository(NavigationEntity);

    // Obtén el producto actualizado
    const updatedProduct = await navigationRepository.findOne({ where: { product: { product_id: this.product.product_id } }, relations: { department: true, category: true, subcategory: true, product: true, variants: true } });

    // Verifica si se encontró el producto
    if (!updatedProduct) {
      throw new Error('Producto no encontrado');
    }

    const departmentValue = `department${stringEmpty(updatedProduct.department.department)}`;
    const categoryValue = `category${stringEmpty(updatedProduct.category.category)}`;
    const subcategoryValue = `subcategory${stringEmpty(updatedProduct.subcategory.subcategory)}`;
    const brandValue = `brand${stringEmpty(updatedProduct.product.brand)}`;
    const specificationsValues = objectString(updatedProduct.product.specifications);
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
    ${attributesValues} ${objectString(this.attributes)}
    `.trim();

    // Actualiza el filtro en la navegación
    updatedProduct.filter = filter;

    // Guarda los cambios en la base de datos
    await navigationRepository.save(updatedProduct);

  }

  @BeforeUpdate()
  async updateFilter() {
    // Obtén el repositorio de NavigationEntity
    const navigationRepository = AppDataSource.getRepository(NavigationEntity);

    // Obtén el producto actualizado
    const updatedProduct = await navigationRepository.findOne({ where: { product: { product_id: this.product.product_id } }, relations: { department: true, category: true, subcategory: true, product: true, variants: true } });

    // Verifica si se encontró el producto
    if (!updatedProduct) {
      throw new Error('Producto no encontrado');
    }

    const filterVariants = updatedProduct.variants.filter(v => v.variant_id !== this.variant_id)

    const departmentValue = `department${stringEmpty(updatedProduct.department.department)}`;
    const categoryValue = `category${stringEmpty(updatedProduct.category.category)}`;
    const subcategoryValue = `subcategory${stringEmpty(updatedProduct.subcategory.subcategory)}`;
    const brandValue = `brand${stringEmpty(updatedProduct.product.brand)}`;
    const specificationsValues = objectString(updatedProduct.product.specifications);
    const attributesValues = updatedProduct?.variants &&
      filterVariants.length > 0 ? filterVariants.reduce((acc, item) => {
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
   ${attributesValues} ${objectString(this.attributes)}
   `.trim();

    // Actualiza el filtro en la navegación
    updatedProduct.filter = filter;

    // Guarda los cambios en la base de datos
    await navigationRepository.save(updatedProduct);

  }

  @BeforeRemove()
  async deleteFilter() {
    // Obtén el repositorio de NavigationEntity
    const navigationRepository = AppDataSource.getRepository(NavigationEntity);

    // Obtén el producto actualizado
    const updatedProduct = await navigationRepository.findOne({ where: { product: { product_id: this.product.product_id } }, relations: { department: true, category: true, subcategory: true, product: true, variants: true } });

    // Verifica si se encontró el producto
    if (!updatedProduct) {
      throw new Error('Producto no encontrado');
    }
    console.log(updatedProduct);

    const filterVariants = updatedProduct.variants.filter(v => v.variant_id !== this.variant_id)

    const departmentValue = `department${stringEmpty(updatedProduct.department.department)}`;
    const categoryValue = `category${stringEmpty(updatedProduct.category.category)}`;
    const subcategoryValue = `subcategory${stringEmpty(updatedProduct.subcategory.subcategory)}`;
    const brandValue = `brand${stringEmpty(updatedProduct.product.brand)}`;
    const specificationsValues = objectString(updatedProduct.product.specifications);
    const attributesValues = updatedProduct?.variants &&
      filterVariants.length > 0 ? filterVariants.reduce((acc, item) => {
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

    // Guarda los cambios en la base de datos
    await navigationRepository.save(updatedProduct);

  }

}