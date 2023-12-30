import { Request, Response } from 'express';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { ProductEntity } from '../products/entity';
import { VariantEntity } from '../variants/entity';
import { AppDataSource } from '../../core/db/postgres';
import { NavigationEntity } from '../navigation/entity';

export default {
  async createVariant(req: Request, res: Response) {
    try {
      const { product_id } = req.params;
      const { images, attributes, videos, price, stock } = req.body;

      const productRepository = AppDataSource.getRepository(ProductEntity);
      const variantRepository = AppDataSource.getRepository(VariantEntity);

      const existingProduct = await productRepository.findOne({ where: { product_id } });

      if (!existingProduct) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'variant_create', message: 'Producto no encontrado' }],
        });
      }

      const newVariant = new VariantEntity();
      newVariant.images = images;
      newVariant.attributes = attributes;
      newVariant.videos = videos;
      newVariant.price = price;
      newVariant.stock = stock;
      newVariant.product = existingProduct;

      // Después de guardar la variante
      await variantRepository.save(newVariant);

      // Crear entidad de navegación asociada a la variante
      const navigationRepository = AppDataSource.getRepository(NavigationEntity);
      const newNavigation = new NavigationEntity();
      newNavigation.variant = newVariant;

      // Asignar otras entidades relacionadas
      newNavigation.product = newVariant.product;
      newNavigation.subcategory = newVariant.product.subcategory;
      newNavigation.category = newVariant.product.subcategory.category;
      newNavigation.department = newVariant.product.subcategory.category.department;

      // Guardar la entidad de navegación
      await navigationRepository.save(newNavigation);



      successHandler({
        res,
        dataDB: [newVariant],
        json: {
          field: 'variant_create',
          message: 'Variante creada',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async updateVariant(req: Request, res: Response) {
    try {
      const { variant_id } = req.params;
      const { images, attributes, videos, price, stock } = req.body;

      const variantRepository = AppDataSource.getRepository(VariantEntity);

      const existingVariant = await variantRepository.findOne({ where: { variant_id } });

      if (!existingVariant) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'variant_edit', message: 'Variante no encontrada' }],
        });
      }

      existingVariant.images = images;
      existingVariant.attributes = attributes;
      existingVariant.videos = videos;
      existingVariant.price = price;
      existingVariant.stock = stock;

      await variantRepository.save(existingVariant);

      successHandler({
        res,
        dataDB: [existingVariant],
        json: {
          field: 'variant_update',
          message: 'Variante actualizada',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async deleteVariant(req: Request, res: Response) {
    try {
      const { variant_id } = req.params;

      const variantRepository = AppDataSource.getRepository(VariantEntity);

      const existingVariant = await variantRepository.findOne({ where: { variant_id } });

      if (!existingVariant) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'variant_delete', message: 'Variante no encontrada' }],
        });
      }

      await variantRepository.remove(existingVariant);

      successHandler({
        res,
        dataDB: [existingVariant],
        json: {
          field: 'variant_delete',
          message: 'Variante eliminada',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async getVariant(req: Request, res: Response) {
    try {
      const { variant_id } = req.params;

      const variantRepository = AppDataSource.getRepository(VariantEntity);

      const variant = await variantRepository.findOne({ where: { variant_id }, relations: { product: true } });

      if (!variant) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'variant_get', message: 'Variante no encontrada' }],
        });
      }

      successHandler({
        res,
        dataDB: [variant],
        json: {
          field: 'variant_get',
          message: 'Variante obtenida',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
};
