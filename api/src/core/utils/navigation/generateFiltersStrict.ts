import { SelectQueryBuilder } from "typeorm";
import { NavigationEntity } from "../../../modules/navigation/entity";


export interface GenerateFiltersReturn {
  department: string[]
  category: string[]
  subcategory: string[]
  brand: string[]
  attributes: {
    [key: string]: string[];
  }
  specifications: {
    [key: string]: string[];
  }
}

export const generateFiltersStrict = async (queryBuilder: SelectQueryBuilder<NavigationEntity>): Promise<GenerateFiltersReturn> => {

  await queryBuilder
    .getMany();

  const uniqueDepartment = await queryBuilder
    .select(['DISTINCT department.department'])
    .getRawMany();

  const department = uniqueDepartment.map(e => e.department)

  const uniqueCategories = await queryBuilder
    .select(['DISTINCT category.category'])
    .getRawMany();

  const categories = uniqueCategories.map(e => e.category)


  const uniqueSubcategories = await queryBuilder
    .select(['DISTINCT subcategory.subcategory'])
    .getRawMany();

  const subcategories = uniqueSubcategories.map(e => e.subcategory)


  const uniqueBrand = await queryBuilder
    .select(['DISTINCT product.brand'])
    .getRawMany();

  const brand = uniqueBrand.map(e => e.brand)


  const uniqueAttributes = await queryBuilder
    .groupBy('variants.attributes').select([
      'variants.attributes AS attributes',
      'COUNT(variants.attributes) AS count',])
    .getRawMany();


  const attributes = uniqueAttributes.reduce((acc, item) => {
    Object.entries(item.attributes).forEach(([key, value]) => {
      if (!acc[key]) {
        acc[key] = [value];
      } else if (!acc[key].includes(value)) {
        acc[key].push(value);
      }
    });
    return acc;
  }, {});





  const uniqueSpecifications = await queryBuilder
    .groupBy('product.specifications')
    .select([
      'product.specifications AS specification',
      'COUNT(product.specifications) AS count',])
    .getRawMany();

  const specifications = uniqueSpecifications.reduce((acc, item) => {
    Object.entries(item.specification)?.forEach(([key, value]) => {
      if (!uniqueAttributes.some(e => e.attributes[key])) {
        if (!acc[key]) {
          acc[key] = [value];
        } else if (!acc[key]?.includes(value)) {
          acc[key].push(value);
        }
      }
    });
    return acc;
  }, {});


  return {
    department,
    category: categories,
    subcategory: subcategories,
    brand,
    attributes,
    specifications,
  }

}