import { Request, Response } from 'express';
import { Brackets } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../../core/db/postgres';
import { getBreadcrumbs } from '../../core/utils/breadcrumb/breadcrumb';
import { StatusHTTP } from '../../core/utils/enums';
import { findParentProperty } from '../../core/utils/navigation/findParentProperty';
import { generateFilters } from '../../core/utils/navigation/generateFilters';
import { errorHandlerCatch } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { DepartmentEntity } from '../departments/entity';
import { NavigationEntity } from './entity';

// function fetchCount(info: any) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 10000)
//   );
// }

export default {
  async getMenu(_req: Request, res: Response) {
    try {

      const responseMenu = await AppDataSource
        .createQueryBuilder(DepartmentEntity, 'department')
        .leftJoinAndSelect('department.categories', 'category')
        .leftJoinAndSelect('category.subcategories', 'subcategory')
        // .leftJoinAndSelect('subcategory.products', 'product')
        // .leftJoinAndSelect('product.variants', 'variant')
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
          // 'product.product_id', 'product.product',
          // 'variant.images'
        ])
        .getMany();

      // const productsAll = responseDB.map(({ department_id, department, categories }) => {
      //   return {
      //     department_id,
      //     department,
      //     categories: categories.map(({ category_id, category, subcategories }) => {
      //       return {
      //         category_id,
      //         category,
      //         subcategories: subcategories.map(({ subcategory_id, subcategory, products }) => {
      //           return {
      //             subcategory_id,
      //             subcategory,
      //             products: products.map(({ product_id, product, variants }) => {
      //               return {
      //                 product_id,
      //                 product,
      //                 images: variants[0].images
      //               }
      //             })
      //           }
      //         })
      //       }
      //     })
      //   }
      // })

      successHandler({
        res,
        dataDB: responseMenu,
        json: {
          field: 'navigation_get',
          message: 'Departamentos, categorías, subcategoría y productos obtenidos',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async getListProduct(req: Request, res: Response) {
    const { id, skip, take } = req.params;

    try {
      const breadcrumb = await getBreadcrumbs(id);

      const queryBuilder = AppDataSource
        .getRepository(NavigationEntity)
        .createQueryBuilder('navigation')
        .leftJoinAndSelect('navigation.department', 'department')
        .leftJoinAndSelect('navigation.category', 'category')
        .leftJoinAndSelect('navigation.subcategory', 'subcategory')
        .leftJoinAndSelect('navigation.product', 'product')
        .leftJoinAndSelect('navigation.variants', 'variants')
      // .leftJoinAndSelect('product.variants', 'variant');

      // Condición para el ID de navigation
      queryBuilder.andWhere(`navigation.${breadcrumb?.entity}_id = :id`, { id });

      const filtersQueryBuilder = queryBuilder.clone();
      const filters = await generateFilters(filtersQueryBuilder);

      if (filters) {
        queryBuilder.andWhere(new Brackets(qb => {
          Object.entries(req.query).forEach(([key, value]) => {
            const newValue = Array.isArray(value) ? value : [value]
            const parent = findParentProperty(filters, key)
            const variantProperty: string =
              parent === 'category' ? `category.category` :
                parent === 'subcategory' ? `subcategory.subcategory` :
                  parent === 'brand' ? `product.brand` :
                    parent === 'specifications' ? `product.specifications` : `variants.attributes`

            if (parent === 'specifications' || parent === 'attributes') {
              newValue.forEach((element) => {
                const uniqueId = uuidv4().replace(/-/g, '')
                qb.orWhere(`${variantProperty} ::jsonb @> :${parent}${uniqueId}`, { [`${parent}${uniqueId}`]: { [key]: element } })
              })
            } else {
              qb.orWhere(`${variantProperty} IN (:...${key})`, { [key]: newValue })
            }
          })
        }))
      }

      // Seleccionar campos específicos
      const filteredProducts = await queryBuilder
        // .select([
        //   'navigation.product',
        //   'product.brand',
        //   'product.description', // Agrega otros campos que desees seleccionar
        // ])
        .skip(Number(skip))
        .take(Number(take))
        .getMany(); // Usa getRawMany para obtener resultados como objetos crudos

      // Obtener el recuento total
      const totalCount = await queryBuilder.getCount();

      successHandler({
        res,
        dataDB: {
          totalCount,
          filters,
          breadcrumb,
          listProduct: filteredProducts,
        },
        json: {
          field: 'navigation_list-product',
          message: 'Datos obtenidos',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async getSearch(req: Request, res: Response) {
    const { search } = req.params;

    try {
      const queryBuilder = AppDataSource
        .getRepository(NavigationEntity)
        .createQueryBuilder('navigation')
        .leftJoinAndSelect('navigation.department', 'department')
        .leftJoinAndSelect('navigation.category', 'category')
        .leftJoinAndSelect('navigation.subcategory', 'subcategory')
        .leftJoinAndSelect('navigation.product', 'product')
        .leftJoinAndSelect('navigation.variants', 'variants');

      const searchTerms = search.split(' ').join('|');
      // console.log(searchTerms)

      // Condición para el nombre del producto (ILIKE para búsqueda insensible a mayúsculas y minúsculas)
      // queryBuilder.where(`product.product ILIKE :productName`, { productName: `%${search}%` });
      queryBuilder
        // .where('to_tsvector(\'simple\', CAST(navigation.search AS text)) @@ plainto_tsquery(\'simple\', CAST(:query AS text))', { query: search })

        // .where(`navigation.search::text ILIKE :productName`, { productName: `%${search}%` })

        // .where(`LOWER(product.product) ~ LOWER(:regex)`, { regex: `(${searchTerms})` })
        .where(`LOWER(navigation.search::text) ~ LOWER(:regex)`, { regex: `(${searchTerms})` })
      // Seleccionar campos específicos
      const filteredProducts = await queryBuilder
        .skip(0)
        .take(6)
        .getMany();

      // Obtener el recuento total
      const totalCount = await queryBuilder.getCount();

      successHandler({
        res,
        dataDB: {
          totalCount,
          listProduct: filteredProducts,
        },
        json: {
          field: 'navigation_search',
          message: 'Datos obtenidos',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  }


};




// // Agregar filtro adicional para la marca (brand)
// if (category) {
//   if (Array.isArray(category)) {
//     queryBuilder.andWhere('category.category IN (:...category)', { category });
//   } else {
//     queryBuilder.andWhere('category.category = :category', { category: category });
//   }
// }

// if (subcategory) {
//   if (Array.isArray(subcategory)) {
//     queryBuilder.andWhere('subcategory.subcategory IN (:...subcategory)', { subcategory });
//   } else {
//     queryBuilder.andWhere('subcategory.subcategory = :subcategory', { subcategory: subcategory });
//   }
// }

// if (brand) {
//   if (Array.isArray(brand)) {
//     queryBuilder.andWhere('product.brand IN (:...brands)', { brands: brand });
//   } else {
//     queryBuilder.andWhere('product.brand = :brand', { brand });
//   }
// }

// Condiciones OR para los filtros de specifications
// queryBuilder
//   .andWhere(
//     new Brackets(qb => {
//       qb.orWhere('product.specifications ::jsonb @> :specifications1', { specifications1: { Redes: '4G/LTE' } })
//       .orWhere('product.specifications ::jsonb @> :specifications2', { specifications2: { Redes: '4 G' } })
//         // .orWhere('product.specifications @> :specifications2', { specifications2: { Procesador: 'A13 Bionic' } })
//         // .orWhere('product.specifications @> :specifications3', { specifications3: { 'Memoria RAM': '8 GB' } })
//         // .orWhere('product.specifications @> :specifications4', { specifications4: { 'Sistema Operativo': 'Android' } })
//         // .orWhere('product.specifications @> :specifications5', { specifications5: { Color: 'Negro' } });
//     })
//   );



// const totalCount = await AppDataSource
//   .getRepository(NavigationEntity)
//   .createQueryBuilder('navigation')
//   .leftJoinAndSelect('navigation.department', 'department')
//   .leftJoinAndSelect('navigation.category', 'category')
//   .leftJoinAndSelect('navigation.subcategory', 'subcategory')
//   .leftJoinAndSelect('navigation.product', 'product')
//   .where(`navigation.${breadcrumb?.entity}.${breadcrumb?.entity}_id = :id`, { id });

// // Agregar filtro adicional para la marca (brand) en el conteo
// if (brand) {
//   totalCount.andWhere('product.brand = :brand', { brand });
// }


// const listProduct = await AppDataSource
// .getRepository(NavigationEntity)
// .createQueryBuilder('navigation')
// .leftJoinAndSelect('navigation.department', 'department')
// .leftJoinAndSelect('navigation.category', 'category')
// .leftJoinAndSelect('navigation.subcategory', 'subcategory')
// .leftJoinAndSelect('navigation.product', 'product')
// .leftJoinAndSelect('product.variants', 'variant')  // Asegúrate de que la relación se llama 'variants'
// // .leftJoinAndSelect('navigation.variant', 'variant')
// .where(`navigation.${breadcrumb?.entity}.${breadcrumb?.entity}_id = :id`, { id })
// .skip(skip)
// .take(take)
// .getMany();

// const totalCount = await AppDataSource
// .getRepository(NavigationEntity)
// .createQueryBuilder('navigation')
// .leftJoinAndSelect('navigation.department', 'department')
// .leftJoinAndSelect('navigation.category', 'category')
// .leftJoinAndSelect('navigation.subcategory', 'subcategory')
// .leftJoinAndSelect('navigation.product', 'product')
// // .leftJoinAndSelect('navigation.variant', 'variant')
// .where(`navigation.${breadcrumb?.entity}.${breadcrumb?.entity}_id = :id`, { id })
// .getCount();
///////////////////////////////////////////////////////////////////////////////////////////////////////

// const listProduct = await navigationRepository
//         .createQueryBuilder('navigation')
//         .leftJoinAndSelect('navigation.department', 'department')
//         .leftJoinAndSelect('navigation.category', 'category')
//         .leftJoinAndSelect('navigation.subcategory', 'subcategory')
//         .leftJoinAndSelect('navigation.product', 'product')
//         .leftJoinAndSelect('navigation.variant', 'variant')
//         .where('navigation.department.department_id = :id', { id })
//         .orWhere('navigation.category.category_id = :id', { id })
//         .orWhere('navigation.subcategory.subcategory_id = :id', { id })
//         .orWhere('navigation.product.product_id = :id', { id })
//         .orWhere('variant.variant_id = :id', { id })
//         .skip(skip)
//         .take(take)
//         .getMany();


// const navigationRepository = AppDataSource.getRepository(NavigationEntity);

// const results = await navigationRepository
// .createQueryBuilder('navigation')
// // .leftJoinAndSelect('navigation.department', 'department')
// // .leftJoinAndSelect('navigation.category', 'category')
// // .leftJoinAndSelect('navigation.subcategory', 'subcategory')
// .leftJoinAndSelect('navigation.product', 'product')
// .leftJoinAndSelect('navigation.variant', 'variant')
// .where('navigation.department.department_id = :id', { id: 'eec2510c-7cce-4cef-b3cf-6e03ff03ff63' })
// .getMany();

// const navigationRepository = AppDataSource.getRepository(NavigationEntity);

// const results = await navigationRepository
//   .createQueryBuilder('navigation')
//   // .leftJoinAndSelect('navigation.department', 'department')
//   // .leftJoinAndSelect('navigation.category', 'category')
//   // .leftJoinAndSelect('navigation.subcategory', 'subcategory')
//   .leftJoinAndSelect('navigation.product', 'product')
//   .leftJoinAndSelect('navigation.variant', 'variant')
//   .where('navigation.department.department_id = :id', { id })
//   .orWhere('navigation.category.category_id = :id', { id })
//   .orWhere('navigation.subcategory.subcategory_id = :id', { id })
//   .orWhere('product.product_id = :id', { id })
//   .orWhere('variant.variant_id = :id', { id })
//   .getMany();
