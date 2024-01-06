import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { getBreadcrumbs } from '../../core/utils/breadcrumb/breadcrumb';
import { StatusHTTP } from '../../core/utils/enums';
import { generateFilters } from '../../core/utils/navigation/generateFilters';
import { errorHandlerCatch } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { DepartmentEntity } from '../departments/entity';
import { ProductEntity } from '../products/entity';
import { NavigationEntity } from './entity';

// function fetchCount(info: any) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 10000)
//   );
// }

export interface ListProduct {
  // department: Omit<DepartmentEntity, 'categories'>;
  // category: Omit<CategoryEntity, 'department' | 'subcategories'>;
  // subcategory: Omit<SubcategoryEntity, 'category' | 'products'>;
  product: Omit<ProductEntity, 'subcategory'>;
  // variant: Omit<VariantEntity, 'product'>;
}

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
    const { brand, category, subcategory } = req.query;
    console.log(req.query)

    try {
      const breadcrumb = await getBreadcrumbs(id);

      const queryBuilder = AppDataSource
        .getRepository(NavigationEntity)
        .createQueryBuilder('navigation')
        .leftJoinAndSelect('navigation.department', 'department')
        .leftJoinAndSelect('navigation.category', 'category')
        .leftJoinAndSelect('navigation.subcategory', 'subcategory')
        .leftJoinAndSelect('navigation.product', 'product')
        .leftJoinAndSelect('product.variants', 'variant')
        .where(`navigation.${breadcrumb?.entity}_id = :id`, { id });

      const filtersQueryBuilder = queryBuilder.clone();

      const filters = await generateFilters(filtersQueryBuilder);

      // Agregar filtro adicional para la marca (brand)
      if (category) {
        if (Array.isArray(category)) {
          queryBuilder.andWhere('category.category IN (:...categories)', { categories: category });
        } else {
          queryBuilder.andWhere('category.category = :category', { category });
        }
      }

      if (subcategory) {
        if (Array.isArray(subcategory)) {
          queryBuilder.andWhere('subcategory.subcategory IN (:...subcategories)', { subcategories: subcategory });
        } else {
          queryBuilder.andWhere('subcategory.subcategory = :subcategory', { subcategory });
        }
      }

      if (brand) {
        if (Array.isArray(brand)) {
          queryBuilder.andWhere('product.brand IN (:...brands)', { brands: brand });
        } else {
          queryBuilder.andWhere('product.brand = :brand', { brand });
        }
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
};




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
