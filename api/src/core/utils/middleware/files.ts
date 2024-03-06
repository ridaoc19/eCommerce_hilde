import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../../data-source';
import { findParentUUID } from '../findParentUUID';
import { StatusHTTP } from '../send/enums';
import { errorHandlerCatch, errorHandlerRes } from '../send/errorHandler';

const filesMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const route = req.originalUrl.split('/').filter(Boolean);
    const entity = route[0];
    const method = req.method;
    const UUID = route[2];
    const body = req.body;


    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {

      const filterFilesBody = Object.entries(body).flatMap(([key, value]) => {
        if (key.startsWith('image') || key.startsWith('video')) {
          const images = Array.isArray(value) ? value : [value];
          return images.length > 0 ? images.map(e => e) : []
        }
        return [];
      }).filter(Boolean);

      // console.log({ filterFilesBody }, 'body')

      if (method === 'POST' && filterFilesBody.length > 0) {
        await axios.post(`${process.env.URL_SERVER_FILES}/files/add-selected?selected=true`, { add: filterFilesBody })
      }


      if (method === 'PUT' || method === 'DELETE') {
        try {
          if (!findParentUUID(UUID)) return errorHandlerRes({
            res, req,
            status_code: 404,
            status: StatusHTTP.notFound_404,
            errors: [{ field: `file_${method}`, message: `Error al enviar el ID de ${entity} del método ${method} por parámetro` }],
          });

          // Importar la entidad dinámicamente
          let dynamicEntity = await import(`../../../modules/${entity}/entity`);

          // Obtener el objeto de db
          const findElementDB = await AppDataSource
            .getRepository(dynamicEntity.default)
            .createQueryBuilder(entity)
            .where(`${entity}.${entity}_id = :id`, { id: UUID })
            .getOne();

          if (!findElementDB) return errorHandlerRes({
            res, req,
            status_code: 404,
            status: StatusHTTP.notFound_404,
            errors: [{ field: `file_${method}`, message: `Error al buscar en la entidad ${entity} el ID pasado por parámetro` }],
          });

          const filteredFilesDB = Object.entries(findElementDB).flatMap(([key, value]) => {
            if (key.startsWith('image') || key.startsWith('video')) {
              const images = Array.isArray(value) ? value : [value];
              return images.length > 0 ? images.map(e => e) : [];
            }
            return [];
          }).filter(Boolean);

          if (filteredFilesDB.length > 0) {

            if (method === 'DELETE' && filteredFilesDB.length > 0) {
              // console.log({ filteredFilesDB }, 'delete')
              await axios.post(`${process.env.URL_SERVER_FILES}/files/create-delete?entity=back&location=back&name=back&selected=false`, { delete: filteredFilesDB })
            }

            if (method === 'PUT' && filterFilesBody.length > 0) {
              // console.log({ filteredFilesDB })
              const filterDelete = filteredFilesDB.filter(e => !filterFilesBody.includes(e))
              // console.log({ filterDelete }, 'put')
              if (filterDelete.length > 0) {
                await axios.post(`${process.env.URL_SERVER_FILES}/files/create-delete?entity=back&location=back&name=back&selected=false`, { delete: filterDelete })
              }

              await axios.post(`${process.env.URL_SERVER_FILES}/files/add-selected?selected=true`, { add: filterFilesBody })
            }
            return next()
          }
          return next()
        } catch (error) {
          console.error('Error en el middleware:', error);
          errorHandlerCatch({error, req, res})
        }
      }
    }

    return next();
  } catch (error) {
    // Manejar errores generales
    console.error('Error en el middleware:', error);
    errorHandlerCatch({error, req, res})
  }
};

export default filesMiddleware;
