import { Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';

// import { findParentProperty } from '../../core/utils/navigation/findParentProperty';

import { Brackets } from 'typeorm';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import NavigationEntity from './entity';

import { getBreadcrumbs } from '../../core/utils/breadcrumb/breadcrumb';
import { findParentUUID } from '../../core/utils/findParentUUID';
import { stringEmpty } from '../../core/utils/functionsGlobal';
import { generateFilters } from '../../core/utils/navigation/generateFilters';
import { generateFiltersDashboard } from '../../core/utils/navigation/generateFiltersDashboard';
import { generateFiltersStrict } from '../../core/utils/navigation/generateFiltersStrict';
import { StatusHTTP } from '../../core/utils/send/enums';
import { AppDataSource } from '../../data-source';
import DepartmentEntity from '../department/entity';

// function fetchCount(info: any) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 10000)
//   );
// }

export default {
  async getMenu(req: Request, res: Response) {
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
      errorHandlerCatch({ req, error, res });
    }
  },

  async getListProduct(req: Request, res: Response) {
    const { id, skip, take } = req.params;
    const filtersQuery = Object.entries(req.query).map(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];
      return values.map((element: string) => `${stringEmpty(key)}${stringEmpty(element)}`);
    }).flat();

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

      const filtersQueryBuilder = queryBuilder.clone();
      const generateFiltersResponse = await generateFilters(filtersQueryBuilder, id, breadcrumb?.entity);

      // Condición para el ID de navigation
      if (findParentUUID(id)) {
        queryBuilder.where(`navigation.${breadcrumb?.entity}_id = :id`, { id });

        if (Object.keys(req.query).length > 0) {
          queryBuilder.andWhere(`LOWER(navigation.filter::text) ~ LOWER(:regex)`, { regex: `(${filtersQuery.join('|')})` })
        }

      } else {
        const searchTerms = id.split(' ').join('|');
        queryBuilder.where(`LOWER(navigation.search::text) ~ LOWER(:regex)`, { regex: `(${searchTerms})` })

        if (Object.keys(req.query).length > 0) {
          queryBuilder.andWhere(new Brackets(qb => {
            filtersQuery.forEach((term, index) => {
              qb.orWhere(`navigation.filter::text ILIKE :term${index}`, { [`term${index}`]: `%${term}%` });
            });
          }));
        }
      }

      // queryBuilder.andWhere('to_tsvector(\'simple\', CAST(navigation.filter AS text)) @@ plainto_tsquery(\'simple\', CAST(:query AS text))', { query: filtersQuery.join(' ') })
      // filtersQuery.forEach((el, i) => {
      //   console.log({el})
      //   qb.orWhere(`navigation.filter::text ILIKE :${el}${i}`, { [`${el}${i}`]: `%${el}%` })
      // })
      // if (Object.keys(req.query).length > 0) {
      //   const filters = Object.entries(req.query).map(([key, value]) => {
      //     const values = Array.isArray(value) ? value : [value];
      //     return values.map((element: string) => `${stringEmpty(key)}${stringEmpty(element)}`);
      //   }).flat();
      //   console.log(req.query, filters.join(' '), "ENTRO")
      //   // queryBuilder.andWhere(`navigation.filters::text ILIKE :productName`, { productName: `%${filters.join(' ')}%` })
      //   queryBuilder.andWhere(`LOWER(navigation.filter::text) ~ LOWER(:regex)`, { regex: `(${filters.join('|')})` })
      // }


      const ensayo = queryBuilder.clone();
      const totalCountf = await ensayo.getCount();
      console.log(totalCountf)

      // Seleccionar campos específicos
      const filteredProducts = await queryBuilder
        .skip(Number(skip))
        .take(Number(take))
        .getMany(); // Usa getRawMany para obtener resultados como objetos crudos

      // Obtener el recuento total
      const totalCount = await queryBuilder.getCount();

      successHandler({
        res,
        dataDB: {
          totalCount,
          filters: generateFiltersResponse,
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
      console.log(error)
      errorHandlerCatch({ req, error, res });
    }
  },
  async getListProductStrict(req: Request, res: Response) {
    const { id, skip, take } = req.params;
    const filtersQuery = Object.entries(req.query).map(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];
      return values.map((element: string) => `${stringEmpty(key)}${stringEmpty(element)}`);
    }).flat();
    // }).flat().join('|');

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

      // Condición para el ID de navigation
      if (findParentUUID(id)) {
        queryBuilder.where(`navigation.${breadcrumb?.entity}_id = :id`, { id });
        console.log(filtersQuery)


        if (Object.keys(req.query).length > 0) {
          queryBuilder.andWhere('to_tsvector(\'simple\', CAST(navigation.filter AS text)) @@ plainto_tsquery(\'simple\', CAST(:query AS text))', { query: filtersQuery.join(' ') })
        }
      } else {
        const searchTerms = id.split(' ').join('|');
        queryBuilder.where(`LOWER(navigation.search::text) ~ LOWER(:regex)`, { regex: `(${searchTerms})` })
        queryBuilder
          .andWhere(new Brackets(qb => {
            // Condición para la columna 'search'
            // qb.where('LOWER(navigation.search::text) ~ LOWER(:search)', { search: `(${searchTerms})` });

            if (Object.keys(req.query).length > 0) {
              qb.andWhere('to_tsvector(\'simple\', CAST(navigation.filter AS text)) @@ plainto_tsquery(\'simple\', CAST(:query AS text))', { query: filtersQuery.join(' ') })
            }
          }));

      }

      // Seleccionar campos específicos
      const filteredProducts = await queryBuilder
        .skip(Number(skip))
        .take(Number(take))
        .getMany();

      // Obtener el recuento total
      const totalCount = await queryBuilder.getCount();

      const filtersQueryBuilder = queryBuilder.clone();
      const generateFiltersResponse = await generateFiltersStrict(filtersQueryBuilder);


      successHandler({
        res,
        dataDB: {
          totalCount,
          filters: generateFiltersResponse,
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
      errorHandlerCatch({ req, error, res });
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
      console.log(searchTerms)

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
        .take(4)
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
      errorHandlerCatch({ req, error, res });
    }
  },

  async getListProductDashboard(req: Request, res: Response) {
    const { id, entity, type } = req.params;

    try {

      const queryBuilder = AppDataSource
        .getRepository(NavigationEntity)
        .createQueryBuilder('navigation')
        .leftJoinAndSelect('navigation.department', 'department')
        .leftJoinAndSelect('navigation.category', 'category')
        .leftJoinAndSelect('navigation.subcategory', 'subcategory')
        .leftJoinAndSelect('navigation.product', 'product')
        .leftJoinAndSelect('navigation.variants', 'variants')

      let breadcrumb = null
      let filteredProducts = null
      let totalCount = null
      let generateFiltersResponse = null
      // Condición para el ID de navigation
      if (findParentUUID(id) && type === 'selected') {
        breadcrumb = await getBreadcrumbs(id);
        queryBuilder.where(`navigation.${breadcrumb?.entity}_id = :id`, { id });
        // Seleccionar campos específicos
        filteredProducts = await queryBuilder
          .skip(0)
          .take(15)
          .getMany();

        // Obtener el recuento total
        totalCount = await queryBuilder.getCount();

      } else {
        if (findParentUUID(id)) {
          queryBuilder.where(`navigation.${entity}_id = :id`, { id });
        } else {
          queryBuilder.where(`${entity}.${entity} ILIKE :productName`, { productName: `%${id}%` });
        }
        const filtersQueryBuilder = queryBuilder.clone();
        generateFiltersResponse = await generateFiltersDashboard(filtersQueryBuilder);
      }




      successHandler({
        res,
        dataDB: {
          totalCount,
          filters: generateFiltersResponse,
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
      errorHandlerCatch({ req, error, res });
    }
  },

  async getListProductDashboardEnsayo(req: Request, res: Response) {
    const { id, entity, type } = req.params;
    try {
      const dynamicEntity = await import(`../${entity}/entity`);

      const queryBuilder = AppDataSource
        .getRepository(dynamicEntity.default)
        .createQueryBuilder(entity)


      let breadcrumb = null
      let totalCount = null

      if (findParentUUID(id) && type === 'selected') {
        breadcrumb = await getBreadcrumbs(id);
        queryBuilder.where(`${entity}.${breadcrumb?.entity}_id = :id`, { id });
      } else {
        if (findParentUUID(id)) {
          queryBuilder.where(`${entity}.${entity}_id = :id`, { id });
        } else {
          const searchTerms = id.split(' ').join('|');
          queryBuilder.where(`LOWER(${entity}.${entity}::text) ~ LOWER(:regex)`, { regex: `(${searchTerms})` })
          // queryBuilder.where(`${entity}.${entity} ILIKE :productName`, { productName: `%${id}%` });
        }
      }

      if (entity === 'department') {
        queryBuilder.leftJoinAndSelect('department.categories', 'category')
          .leftJoinAndSelect('category.subcategories', 'subcategory')
          .leftJoinAndSelect('subcategory.products', 'product')
          .leftJoinAndSelect('product.variants', 'variants')
      } else if (entity === 'category') {
        queryBuilder.leftJoinAndSelect('category.department', 'department')
          .leftJoinAndSelect('category.subcategories', 'subcategory')
          .leftJoinAndSelect('subcategory.products', 'product')
          .leftJoinAndSelect('product.variants', 'variants')
      } else if (entity === 'subcategory') {
        queryBuilder.leftJoinAndSelect('subcategory.category', 'category')
          .leftJoinAndSelect('category.department', 'department')
          .leftJoinAndSelect('subcategory.products', 'product')
          .leftJoinAndSelect('product.variants', 'variants')
      } else if (entity === 'product') {
        queryBuilder.leftJoinAndSelect('product.subcategory', 'subcategory')
          .leftJoinAndSelect('subcategory.category', 'category')
          .leftJoinAndSelect('category.department', 'department')
          .leftJoinAndSelect('product.variants', 'variants')
      } else if (entity === 'variant') {
        queryBuilder.leftJoinAndSelect('variants.product', 'product')
          .leftJoinAndSelect('product.subcategory', 'subcategory')
          .leftJoinAndSelect('subcategory.category', 'category')
          .leftJoinAndSelect('category.department', 'department')
      }

      await queryBuilder
        // .skip(0)
        // .take(15)
        .getMany();

      // Obtener el recuento total
      totalCount = await queryBuilder.getCount();

      let department = await queryBuilder
        .select('DISTINCT ON (department.department) department.department, department.department_id')
        .getRawMany();

      department = department.length > 0 && department[0].department_id ? department : []

      let category = await queryBuilder
        .select(['DISTINCT ON (category.category) category.category, category.category_id'])
        .getRawMany();

      category = category.length > 0 && category[0].category_id ? category : []

      let subcategory = await queryBuilder
        .select(['DISTINCT ON (subcategory.subcategory) subcategory.subcategory, subcategory.subcategory_id'])
        .getRawMany();

      subcategory = subcategory.length > 0 && subcategory[0].subcategory_id ? subcategory : []

      let product = await queryBuilder
        .select(['DISTINCT ON (product.product) product.product, product.product_id, product.brand, product.description, product.warranty, product.contents, product.specifications, product.benefits'])
        .getRawMany();

      product = product.length > 0 && product[0].product_id ? product : []

      let variant = await queryBuilder
        .select(['DISTINCT ON (variants.variant_id) variants.variant_id, variants.images, variants.attributes, variants.videos, variants.price, variants.listPrice, variants.stock'])
        .getRawMany();

      variant = variant.length > 0 && variant[0].variant_id ? variant : []

      successHandler({
        res,
        dataDB: {
          totalCount,
          breadcrumb,
          listProduct: null,
          filters: {
            department,
            category,
            subcategory,
            product,
            variant
          }
        },
        json: {
          field: 'navigation_list-product',
          message: 'Datos obtenidos',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      console.log(error)
      errorHandlerCatch({ req, error, res });
    }
  },
  async postFavorites(req: Request, res: Response) {
    try {

    } catch (error) {
      errorHandlerCatch({ error, req, res })
    }
  },
  /////PRODUCT VIEW
  async postProductView(req: Request, res: Response) {
    const { productId } = req.params;
    try {
      const navigationRepository = AppDataSource.getRepository(NavigationEntity);
      const navigation = await navigationRepository.findOne({ where: { product: { product_id: productId } } });
      console.log({ navigation, productId })
      if (!navigation) {
        return errorHandlerRes({
          status_code: 400, status: StatusHTTP.badRequest_400, req, res, errors: [{
            field: 'product_view_post',
            message: 'producto no encontrado'
          }]
        });
      }

      navigation.product_view += 1;
      await navigationRepository.save(navigation);

      const productView = await getProductViews()

      successHandler({
        res,
        dataDB: productView,
        json: {
          field: 'product_view_get',
          message: 'Los productos con mas vistas',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });


    } catch (error) {
      errorHandlerCatch({ error, req, res })
    }
  },

  async getProductView(req: Request, res: Response) {
    try {
      const productView = await getProductViews()

      successHandler({
        res,
        dataDB: productView,
        json: {
          field: 'product_view_get',
          message: 'Los productos con mas vistas',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });

    } catch (error) {
      errorHandlerCatch({ error, req, res })
    }
  },
  /////PRODUCT VIEW

  async postCart(req: Request, res: Response) {
    try {

    } catch (error) {
      errorHandlerCatch({ error, req, res })
    }
  }
};




const getProductViews = async () => {
  // const navigationRepository = AppDataSource.getRepository(NavigationEntity);
  // const topViewedProducts = await navigationRepository
  //   .createQueryBuilder("navigation")
  //   .orderBy("navigation.product_view", "DESC")
  //   .leftJoinAndSelect('navigation.product', 'product')
  //   .take(20)
  //   .getMany();


  const getTopViewedProducts = await AppDataSource
    .getRepository(NavigationEntity)
    .createQueryBuilder("navigation")
    .orderBy("navigation.product_view", "DESC")
    .leftJoinAndSelect('navigation.product', 'product')
    .take(15)
    .getMany();


  const topViewedProducts = getTopViewedProducts.map(product => product.product)

  return topViewedProducts;

}





















































// // busqueda de filtros
// if (generateFiltersResponse) {
//   queryBuilder.andWhere(new Brackets(qb => {
//     Object.entries(req.query).forEach(([key, value]) => {
//       const newValue = Array.isArray(value) ? value : [value]
//       const parent = findParentProperty(generateFiltersResponse, key)
//       const variantProperty: string =
//         parent === 'category' ? `category.category` :
//           parent === 'subcategory' ? `subcategory.subcategory` :
//             parent === 'brand' ? `product.brand` :
//               parent === 'specifications' ? `product.specifications` : `variants.attributes`

//       if (parent === 'specifications' || parent === 'attributes') {
//         newValue.forEach((element) => {
//           const uniqueId = uuidv4().replace(/-/g, '')
//           qb.orWhere(`${variantProperty} ::jsonb @> :${parent}${uniqueId}`, { [`${parent}${uniqueId}`]: { [key]: element } })
//         })
//       } else {
//         qb.orWhere(`${variantProperty} IN (:...${key})`, { [key]: newValue })
//       }
//     })
//   }))
// }




// const { entities, raw } = await connection.manager
// .createQueryBuilder(Note, 'note')
// .leftJoinAndSelect('note.subjects', 'subject')
// .leftJoinAndSelect('note.notebook', 'notebook')
// .addSelect(
//   "ts_rank_cd(to_tsvector(coalesce(note.content,'')), plainto_tsquery(:query))",
//   'rank'
// )
// .where('notebook."ownerId" =(:userId)', { userId: user.id })
// .andWhere('notebook.id=(:notebookId)', { notebookId: notebook.id })
// .orderBy('rank', 'DESC')
// .setParameter('query', query)
// .getRawAndEntities();

// const enhancedEntities = entities.map((e, index) => {
// return { ...e, rank: raw[index].rank, isTypeOf: 'Note' };
// });

// return enhancedEntities.reduce((accum, entity) => {
// if (entity.rank > 0) {
//   accum.push(entity);
// }
// return accum;
// }, []);
















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
