import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { getBreadcrumbs } from '../../core/utils/breadcrumb/breadcrumb';
import { StatusHTTP } from '../../core/utils/enums';
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
    const id = String(req.query.id)
    const skip = Number(req.query.skip)
    const take = Number(req.query.take)

    try {
      const breadcrumb = await getBreadcrumbs(id)

      const listProduct = await AppDataSource
        .getRepository(NavigationEntity)
        .createQueryBuilder('navigation')
        .leftJoinAndSelect('navigation.department', 'department')
        .leftJoinAndSelect('navigation.category', 'category')
        .leftJoinAndSelect('navigation.subcategory', 'subcategory')
        .leftJoinAndSelect('navigation.product', 'product')
        .leftJoinAndSelect('navigation.variant', 'variant')
        .where(`navigation.${breadcrumb?.entity}.${breadcrumb?.entity}_id = :id`, { id })
        .skip(skip)
        .take(take)
        .getMany();

      successHandler({
        res,
        dataDB: {
          breadcrumb,
          listProduct,
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
