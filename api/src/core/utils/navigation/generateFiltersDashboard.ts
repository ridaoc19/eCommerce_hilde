import { SelectQueryBuilder } from "typeorm";
import NavigationEntity from "../../../modules/navigation/entity";


export interface GenerateFiltersReturn {
  department: string[]
  category: string[]
  subcategory: string[]
  product: string[]
}

export const generateFiltersDashboard = async (queryBuilder: SelectQueryBuilder<NavigationEntity>): Promise<GenerateFiltersReturn> => {

  await queryBuilder
    .getMany();

  const department = await queryBuilder
    .select('DISTINCT ON (department.department) department.department, department.department_id')
    .getRawMany();

  const categories = await queryBuilder
    .select(['DISTINCT ON (category.category) category.category, category.category_id'])
    .getRawMany();

  const subcategories = await queryBuilder
    .select(['DISTINCT ON (subcategory.subcategory) subcategory.subcategory, subcategory.subcategory_id'])
    .getRawMany();

  const product = await queryBuilder
    .select(['DISTINCT ON (product.product) product.product, product.product_id, product.brand, product.description, product.warranty, product.contents, product.specifications, product.benefits'])
    .getRawMany();

    console.log(product);

  return {
    department,
    category: categories,
    subcategory: subcategories,
    product,
  }

}