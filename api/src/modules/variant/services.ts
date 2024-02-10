import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import ProductEntity from '../product/entity';
import VariantEntity from './entity';
import NavigationEntity from '../navigation/entity';

export default {
  async createVariant(req: Request, res: Response) {
    try {
      const { product_id } = req.params;
      const { images, attributes, videos, price, listPrice, stock } = req.body;

      const productRepository = AppDataSource.getRepository(ProductEntity);
      const variantRepository = AppDataSource.getRepository(VariantEntity);
      const navigationRepository = AppDataSource.getRepository(NavigationEntity);

      let existingProduct = await productRepository.findOne({ where: { product_id } });

      if (!existingProduct) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'variant_create', message: 'Producto no encontrado' }],
        });
      }

      let existingNavigation = await navigationRepository.findOne({ where: { product: { product_id: existingProduct.product_id } } });

      if (!existingNavigation) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'variant_create', message: 'Navegación no encontrada' }],
        });
      }

      const newVariant = new VariantEntity();
      newVariant.attributes = attributes
      newVariant.images = images
      newVariant.price = price
      newVariant.listPrice = listPrice
      newVariant.stock = stock
      newVariant.videos = videos
      newVariant.product = existingProduct
      newVariant.navigation = existingNavigation;

      await variantRepository.save(newVariant)

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
      errorHandlerCatch({ error, res, req });
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
          res, req,
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
      errorHandlerCatch({ error, res, req });
    }
  },

  async deleteVariant(req: Request, res: Response) {
    try {
      const { variant_id } = req.params;

      const variantRepository = AppDataSource.getRepository(VariantEntity);

      const existingVariant = await variantRepository.findOne({ where: { variant_id } });

      if (!existingVariant) {
        return errorHandlerRes({
          res, req,
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
      errorHandlerCatch({ error, res, req });
    }
  },

  async getVariant(req: Request, res: Response) {
    try {
      const { variant_id } = req.params;

      const variantRepository = AppDataSource.getRepository(VariantEntity);

      const variant = await variantRepository.findOne({ where: { variant_id }, relations: { product: true } });

      if (!variant) {
        return errorHandlerRes({
          res, req,
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
      errorHandlerCatch({ error, res, req });
    }
  },
};
