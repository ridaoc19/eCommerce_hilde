import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { UserEntity } from './entity';

export default {
  async createUser(req: Request, res: Response) {
    try {
      const newUser = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values([req.body])
        .execute()

      successHandler({
        res,
        dataDB: [newUser],
        json: {
          field: 'user_create',
          message: 'Usuario creado',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async updateUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const updateUser = await AppDataSource
        .createQueryBuilder()
        .update(UserEntity)
        .set(req.body)
        .where({ user_id })
        .execute()

      if (!updateUser) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_edit', message: 'No se actualizo el usuario' }] })
      }

      successHandler({
        res,
        dataDB: [updateUser],
        json: {
          field: 'user_update',
          message: 'Usuario actualizado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const deleteUser = await AppDataSource
        .getRepository(UserEntity)
        .createQueryBuilder()
        .softDelete()
        .where({ user_id })
        .execute();

      if (!deleteUser) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_delete', message: 'No se pudo eliminar el usuario' }] })
      }

      successHandler({
        res,
        dataDB: [deleteUser],
        json: {
          field: 'user_delete',
          message: 'Usuario eliminado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async restoreUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const deleteUser = await AppDataSource
        .getRepository(UserEntity)
        .createQueryBuilder()
        .restore()
        .where({ user_id })
        .execute();

      if (!deleteUser) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_delete', message: 'No se pudo restaurar el usuario' }] })
      }

      successHandler({
        res,
        dataDB: [deleteUser],
        json: {
          field: 'user_restore',
          message: 'Usuario restaurado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async getUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const userRepository = AppDataSource.getRepository(UserEntity);

      const existingUser = await userRepository.findOne({ where: { user_id } });

      if (!existingUser) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_get', message: 'Usuario no encontrado' }] })
      }

      successHandler({
        res,
        dataDB: [existingUser],
        json: {
          field: 'user_get',
          message: 'Usuario obtenido',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
};
