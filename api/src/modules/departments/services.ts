import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { DepartmentEntity } from '../departments/entity';

export default {
  async createDepartment(req: Request, res: Response) {
    try {
      const newDepartment = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(DepartmentEntity)
        .values([req.body])
        .execute()

      if (!newDepartment) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'department_create', message: 'Error al crear el Departamento' }],
        });
      }

      successHandler({
        res,
        dataDB: [newDepartment],
        json: {
          field: 'department_create',
          message: 'Departamento creado',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async updateDepartment(req: Request, res: Response) {
    try {
      const { department_id } = req.params;

      const updateDepartment = await AppDataSource
        .createQueryBuilder()
        .update(DepartmentEntity)
        .set(req.body)
        .where({ department_id })
        .execute()

      if (!updateDepartment) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'department_edit', message: 'Departamento no existe' }],
        });
      }

      // existingDepartment.department = department;

      // await departmentRepository.save(existingDepartment);

      successHandler({
        res,
        dataDB: [updateDepartment],
        json: {
          field: 'department_update',
          message: 'Departamento actualizado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async getDepartment(req: Request, res: Response) {
    try {
      const { department_id } = req.params;

      const existingDepartment = await AppDataSource
        .getRepository(DepartmentEntity)
        .findOne({
          where: { department_id },
          // withDeleted: false,
          relations: { categories: { subcategories: { products: { variants: true } } } }
        });

      if (!existingDepartment) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'department_get', message: 'Departamento no encontrado' }],
        });
      }

      successHandler({
        res,
        dataDB: [existingDepartment],
        json: {
          field: 'department_get',
          message: 'Departamento obtenido',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async deleteDepartment(req: Request, res: Response) {
    try {
      const { department_id } = req.params;
      const departmentRepository = AppDataSource.getRepository(DepartmentEntity);
      const existingDepartment = await departmentRepository.findOne({ where: { department_id }, relations: { categories: { subcategories: { products: { variants: true } } } } });

      if (!existingDepartment) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'department_delete', message: 'Departamento no encontrado' }],
        });
      }

      await departmentRepository.softRemove([existingDepartment]);

      // if (existingDepartment) {
      successHandler({
        res,
        dataDB: [existingDepartment],
        json: {
          field: 'department_delete',
          message: 'Departamento y todas las entidades relacionadas eliminadas lógicamente',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });


    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },

  async restoreDepartment(req: Request, res: Response) {
    try {
      const { department_id } = req.params;
      const departmentRepository = AppDataSource.getRepository(DepartmentEntity);
      const existingDepartment = await departmentRepository.findOne({ where: { department_id }, withDeleted: true, relations: { categories: { subcategories: { products: { variants: true } } } } });

      if (!existingDepartment) {
        return errorHandlerRes({
          res,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'department_restore', message: 'Departamento no encontrado' }],
        });
      }

      await departmentRepository.recover(existingDepartment);

      successHandler({
        res,
        dataDB: [existingDepartment],
        json: {
          field: 'department_restore',
          message: 'Departamento y todas las entidades relacionadas restauradas',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  }, 
};
