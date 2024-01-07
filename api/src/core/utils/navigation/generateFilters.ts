import { SelectQueryBuilder } from "typeorm";
import { NavigationEntity } from "../../../modules/navigation/entity";


export interface GenerateFiltersReturn {
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

export const generateFilters = async (queryBuilder: SelectQueryBuilder<NavigationEntity>): Promise<GenerateFiltersReturn> => {

  await queryBuilder
    .getMany();

  // // Otros filtros si es necesario
  // const attributesFilter = await queryBuilder
  //   // .andWhere(/* Otras condiciones si es necesario */)
  //   .select(['DISTINCT variant.attributes'])
  //   .getRawMany();

  const uniqueCategories = await queryBuilder
    // .andWhere(/* Otras condiciones si es necesario */)
    .select(['DISTINCT category.category'])
    .getRawMany();

  const categories = uniqueCategories.map(e => e.category)


  const uniqueSubcategories = await queryBuilder
    // .andWhere(/* Otras condiciones si es necesario */)
    .select(['DISTINCT subcategory.subcategory'])
    .getRawMany();

  const subcategories = uniqueSubcategories.map(e => e.subcategory)


  const uniqueBrand = await queryBuilder
    // .andWhere(/* Otras condiciones si es necesario */)
    .select(['DISTINCT product.brand'])
    .getRawMany();

  const brand = uniqueBrand.map(e => e.brand)


  // const specifications = await queryBuilder
  //   // .andWhere(/* Otras condiciones si es necesario */)
  //   .select(['DISTINCT product.specification'])
  //   .getRawMany();
  const uniqueAttributes = await queryBuilder
    .groupBy('variant.attributes') // Agrupar por atributos
    .select([
      'variant.attributes AS attributes',
      'COUNT(variant.attributes) AS count', // Contar la cantidad de ocurrencias
    ])
    .getRawMany();

  // ...

  // Filtrar los atributos únicos
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
    .groupBy('product.specifications') // Agrupar por atributos
    .select([
      'product.specifications AS specification',
      'COUNT(product.specifications) AS count', // Contar la cantidad de ocurrencias
    ])
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
    category: categories.length > 1 ? categories : [],
    subcategory: subcategories.length > 1 ? subcategories : [],
    brand,
    attributes,
    specifications,
  }

}