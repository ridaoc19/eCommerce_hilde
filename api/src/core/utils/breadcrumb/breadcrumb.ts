import { CategoryEntity } from "../../../modules/categories/entity";
import { DepartmentEntity } from "../../../modules/departments/entity";
import { ProductEntity } from "../../../modules/products/entity";
import { SubcategoryEntity } from "../../../modules/subcategories/entity";
import { VariantEntity } from "../../../modules/variants/entity";
import { AppDataSource } from "../../db/postgres";

export async function getBreadcrumbs(entityId: string): Promise<any> {
  const entityTypes = ['department', 'category', 'subcategory', 'product', 'variant'];

  for (const entityType of entityTypes) {
    const breadcrumb = await getEntityBreadcrumbs(entityType, entityId);

    if (breadcrumb && breadcrumb.length > 0) {
      return breadcrumb;
    }
  }

  return null;
}

async function getEntityBreadcrumbs(entityType: string, entityId: string): Promise<any> {
  switch (entityType) {
    case 'department':
      return await AppDataSource.getRepository(DepartmentEntity)
        .createQueryBuilder('department')
        .where({ department_id: entityId })
        .select(['department.department_id', 'department.department'])
        .getMany();

    case 'category':
      return await AppDataSource.getRepository(CategoryEntity)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ category_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
        ])
        .getMany();

    case 'subcategory':
      return await AppDataSource.getRepository(SubcategoryEntity)
        .createQueryBuilder('subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ subcategory_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
        ])
        .getMany();

    case 'product':
      return await AppDataSource.getRepository(ProductEntity)
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ product_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
          'product.product_id', 'product.product',
        ])
        .getMany();

    case 'variant':
      return await AppDataSource.getRepository(VariantEntity)
        .createQueryBuilder('variant')
        .leftJoinAndSelect('variant.product', 'product')
        .leftJoinAndSelect('product.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ variant_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
          'product.product_id', 'product.product',
          'variant.variant_id'
        ])
        .getMany();

    default:
      return null;
  }
}
