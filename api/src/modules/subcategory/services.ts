import { Request, Response } from 'express';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import CategoryEntity from '../category/entity';
import SubcategoryEntity from './entity';
import { AppDataSource } from '../../core/db/postgres';

export default {
  async createSubcategory(req: Request, res: Response) {
    try {
      const { category_id } = req.params;
      const { subcategory } = req.body;

      const categoryRepository = AppDataSource.getRepository(CategoryEntity);
      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);

      const existingCategory = await categoryRepository.findOne({ where: { category_id } });

      if (!existingCategory) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'subcategory_create', message: 'Categoría no encontrada' }],
        });
      }

      const newSubcategory = new SubcategoryEntity();
      newSubcategory.subcategory = subcategory;
      newSubcategory.category = existingCategory;

      await subcategoryRepository.save(newSubcategory);

      successHandler({
        res,
        dataDB: [newSubcategory],
        json: {
          field: 'subcategory_create',
          message: 'Subcategoría creada',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res, req });
    }
  },

  async updateSubcategory(req: Request, res: Response) {
    try {
      const { subcategory_id } = req.params;
      const { subcategory } = req.body;

      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);

      const existingSubcategory = await subcategoryRepository.findOne({ where: { subcategory_id } });

      if (!existingSubcategory) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'subcategory_edit', message: 'Subcategoría no existe' }],
        });
      }

      existingSubcategory.subcategory = subcategory;

      await subcategoryRepository.save(existingSubcategory);

      successHandler({
        res,
        dataDB: [existingSubcategory],
        json: {
          field: 'subcategory_update',
          message: 'Subcategoría actualizada',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res, req });
    }
  },

  async deleteSubcategory(req: Request, res: Response) {
    try {
      const { subcategory_id } = req.params;

      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);

      const existingSubcategory = await subcategoryRepository.findOne({ where: { subcategory_id } });

      if (!existingSubcategory) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'subcategory_delete', message: 'Subcategoría no encontrada' }],
        });
      }

      await subcategoryRepository.remove(existingSubcategory);

      successHandler({
        res,
        dataDB: [existingSubcategory],
        json: {
          field: 'subcategory_delete',
          message: 'Subcategoría eliminada',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res, req });
    }
  },

  async getSubcategory(req: Request, res: Response) {
    try {
      const { subcategory_id } = req.params;

      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);

      const subcategory = await subcategoryRepository.findOne({ where: { subcategory_id }, relations: { category: true } });

      if (!subcategory) {
        return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'subcategory_get', message: 'Subcategoría no encontrada' }],
        });
      }

      successHandler({
        res,
        dataDB: [subcategory],
        json: {
          field: 'subcategory_get',
          message: 'Subcategoría obtenida',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res, req });
    }
  },
};
