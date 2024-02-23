import { Request, Response } from 'express';
import { StatusHTTP } from '../../core/utils/send/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { AppDataSource } from '../../data-source';
import NavigationEntity from '../navigation/entity';
import SubcategoryEntity from '../subcategory/entity';
import ProductEntity from './entity';

export default {
  async createProduct(req: Request, res: Response) {
    try {
      const { subcategory_id } = req.params;
      const { product, brand, description, specifications, warranty, benefits, contents } = req.body;
      // console.log(req.body)
      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);
      const productRepository = AppDataSource.getRepository(ProductEntity);

      const existingSubcategory = await subcategoryRepository.findOne({ where: { subcategory_id }, relations: { category: { department: true } } });

      if (!existingSubcategory) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_create', message: 'Subcategoría no encontrada' }],
        });
      }

      const newProduct = new ProductEntity();
      newProduct.product = product
      newProduct.brand = brand
      newProduct.description = description
      newProduct.specifications = specifications
      newProduct.benefits = benefits
      newProduct.contents = contents
      newProduct.warranty = warranty

      newProduct.subcategory = existingSubcategory
      await productRepository.save(newProduct)

      // Crear entidad de navegación asociada a la variante
      const navigationRepository = AppDataSource.getRepository(NavigationEntity);
      const newNavigation = new NavigationEntity();

      // Asignar otras entidades relacionadas
      newNavigation.product = newProduct;
      newNavigation.subcategory = existingSubcategory;
      newNavigation.category = existingSubcategory.category;
      newNavigation.department = existingSubcategory.category.department;

      // Guardar la entidad de navegación
      await navigationRepository.save(newNavigation);

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
      errorHandlerCatch({ error, res, req });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const { product_id } = req.params;
      const { product, brand, description, specifications, warranty, benefits, contents } = req.body;

      const productRepository = AppDataSource.getRepository(ProductEntity);

      const existingProduct = await productRepository.findOne({ where: { product_id } });

      if (!existingProduct) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_edit', message: 'Producto no encontrado' }],
        });
      }

      existingProduct.product = product
      existingProduct.brand = brand
      existingProduct.description = description
      existingProduct.specifications = specifications
      existingProduct.benefits = benefits
      existingProduct.contents = contents
      existingProduct.warranty = warranty

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
      console.log(error)
      errorHandlerCatch({ error, res, req });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const { product_id } = req.params;

      const productRepository = AppDataSource.getRepository(ProductEntity);

      const existingProduct = await productRepository.findOne({ where: { product_id }, relations: { variants: true } });

      if (!existingProduct) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_delete', message: 'Producto no encontrado' }],
        });
      }

      await productRepository.softRemove([existingProduct]);

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
      errorHandlerCatch({ error, res, req });
    }
  },

  async getProduct(req: Request, res: Response) {
    try {
      const { product_id } = req.params;

      const productRepository = AppDataSource.getRepository(ProductEntity);

      const product = await productRepository.findOne({ where: { product_id }, relations: { subcategory: true, variants: true } });

      if (!product) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'product_get', message: 'Producto no encontrado' }],
        });
      }

      successHandler({
        res,
        dataDB: [product],
        json: {
          field: 'product_get',
          message: 'Producto obtenido',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res, req });
    }
  },
};
