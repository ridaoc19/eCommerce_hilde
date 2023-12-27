import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { DepartmentEntity } from '../departments/entity';
import { ProductEntity } from '../products/entity';
import { SubcategoryEntity } from '../subcategories/entity';

export default {
  async createProduct(req: Request, res: Response) {
    try {
      const { subcategory_id } = req.params;
      const { product, brand, description, specification } = req.body;

      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);
      const productRepository = AppDataSource.getRepository(ProductEntity);

      const existingSubcategory = await subcategoryRepository.findOne({ where: { subcategory_id } });

      if (!existingSubcategory) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_create', message: 'Subcategoría no encontrada' }],
        });
      }

      const newProduct = new ProductEntity();
      newProduct.product = product;
      newProduct.brand = brand;
      newProduct.description = description;
      newProduct.specification = specification;
      newProduct.subcategory = existingSubcategory;

      await productRepository.save(newProduct);

      successHandler({
        res,
        dataDB: [newProduct],
        json: {
          field: 'product_create',
          message: 'Producto creado',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const { product_id } = req.params;
      const { product, brand, description, specification } = req.body;

      const productRepository = AppDataSource.getRepository(ProductEntity);

      const existingProduct = await productRepository.findOne({ where: { product_id } });

      if (!existingProduct) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_edit', message: 'Producto no encontrado' }],
        });
      }

      existingProduct.product = product;
      existingProduct.brand = brand;
      existingProduct.description = description;
      existingProduct.specification = specification;

      await productRepository.save(existingProduct);

      successHandler({
        res,
        dataDB: [existingProduct],
        json: {
          field: 'product_update',
          message: 'Producto actualizado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const { product_id } = req.params;

      const productRepository = AppDataSource.getRepository(ProductEntity);

      const existingProduct = await productRepository.findOne({ where: { product_id } });

      if (!existingProduct) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_delete', message: 'Producto no encontrado' }],
        });
      }

      await productRepository.remove(existingProduct);

      successHandler({
        res,
        dataDB: [existingProduct],
        json: {
          field: 'product_delete',
          message: 'Producto eliminado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async getProduct(_req: Request, res: Response) {
    try {

      const productsAll = await AppDataSource
        .createQueryBuilder(DepartmentEntity, 'department')
        .leftJoinAndSelect('department.categories', 'category')
        .leftJoinAndSelect('category.subcategories', 'subcategory')
        .leftJoinAndSelect('subcategory.products', 'producto')
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
          'producto.product_id', 'producto.product',
        ])
        .getMany();

      successHandler({
        res,
        dataDB: [{
          hierarchicalData: productsAll,
          advertisement: {}
        }],
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
};
