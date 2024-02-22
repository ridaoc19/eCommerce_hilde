import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { findParentUUID } from '../findParentUUID';
import { AppDataSource } from '../../../data-source';

const filesMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const route = req.originalUrl.split('/').filter(Boolean);
    const entity = route[0];
    const method = route[1];
    const UUID = route[2];
    let body = req.body;

    // console.log({ viejo: req.body });


    let newBody: any = {};

    // Convertir los valores de tipo string que son objetos JSON a objetos
    if (!Array.isArray(body)) { // para crear array de items
      for (const key in body) {
        if (typeof body[key] === 'string') {
          try {
            const parsedValue = JSON.parse(body[key]);
            if (typeof parsedValue === 'object') {
              newBody[key] = parsedValue;
            } else {
              newBody[key] = body[key];
            }
          } catch (error) {
            newBody[key] = body[key];
          }
        } else if (Array.isArray(body[key]) && !body[key][0]) {
          newBody[key] = [];
        } else {
          newBody[key] = body[key];
        }
      }
    } else {
      newBody = body
    }
    // Procesar archivos adjuntos si existen
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // const files: Record<string, string | string[]> = {};

      // Importar la entidad dinámicamente
      // let dynamicEntity = await import(`../../../modules/${entity}/entity`);
      // const metadata = AppDataSource.getRepository(dynamicEntity.default).metadata

      for (const file of req.files) {
        const { originalname, path } = file;
        const name = originalname.split(".")[0]; // Obtener el nombre sin la extensión
        // const repeatName = req.files.filter((e: Express.Multer.File) => e.originalname.includes(name)).length;
        // const columns = metadata.columns.find((col) => col.propertyName === name);
        if (name === 'images' || name === 'videos') {
          newBody[name] = [...(newBody[name] || []), `${process.env.URL_SERVER}/${path}`];
        } else {
          newBody[name] = `${process.env.URL_SERVER}/${path}`;
        }
      }
    }

    req.body = newBody
    body = newBody

    
    
    if (method === 'edit' || method === 'delete') {
      if (findParentUUID(UUID)) {
        try {
          // Importar la entidad dinámicamente
          let dynamicEntity = await import(`../../../modules/${entity}/entity`);
          
          // Obtener el objeto de db
          const queryBuilder = await AppDataSource
          .getRepository(dynamicEntity.default)
          .createQueryBuilder(entity)
          .where(`${entity}.${entity}_id = :id`, { id: UUID })
          .getOne();
          
          if (!!queryBuilder && Object.keys(queryBuilder).some(e => e.includes('image') || e.includes('video'))) {
            // Obtener las imágenes filtradas
            const filteredImages = Object.entries(queryBuilder).flatMap(([key, value]) => {
              if (key.startsWith('image') || key.startsWith('video')) {
                const images = Array.isArray(value) ? value : [value];
                const filtersImagesLocal = images.filter(e => e.includes(process.env.URL_SERVER));
                const mapFilter = filtersImagesLocal.length > 0 ? filtersImagesLocal.map(e => e.split(`${process.env.FILES_FILTER_IMAGES}`)[1]) : [];
                return mapFilter;
              }
              return [];
            });

            if (method === 'delete' && filteredImages.length > 0) {
              // Eliminar archivos y continuar con el middleware
              if (deleteFiles(filteredImages)) {
                return next();
              }
            }

            if (method === 'edit') {
              // console.log({ filteredImages, body })
              if (Object.keys(body).length > 0) {
                const filterBody = Object.entries(body).flatMap(([key, value]) => {
                  if (key.startsWith('image') || key.startsWith('video')) {
                    const images = Array.isArray(value) ? value : [value];
                    const filtersImagesLocal = images.filter(e => e.includes(process.env.URL_SERVER!));
                    const mapFilter = filtersImagesLocal.length > 0 ? filtersImagesLocal.map(e => e.split(`${process.env.FILES_FILTER_IMAGES}`)[1]) : []
                    return mapFilter;
                  }
                  return [];
                });

                const filterDelete = filteredImages.filter(e => !filterBody.includes(e))

                // console.log({ filterDelete, filterBody })
                if (filterDelete.length > 0) {
                  // Eliminar archivos y continuar con el middleware
                  if (deleteFiles(filterDelete)) {
                    return next();
                  }
                }
                return next()
              }
            }
          }
        } catch (error) {
          // Manejar errores durante la importación o ejecución de consultas
          console.error('Error en el middleware:', error);
        }

        // Continuar con el middleware si no se ha retornado antes
        return next();
      }
    }

    // Continuar con el middleware si no se cumple ninguna condición anterior
    return next();
  } catch (error) {
    // Manejar errores generales
    console.error('Error en el middleware:', error);
    return next();
  }
};

export default filesMiddleware;


export const deleteFiles = (filteredImages: string[]): boolean => {
  try {
    let status = false;

    filteredImages.forEach((url: string) => {
      try {
        const absolutePath = path.resolve(__dirname, '../../../../uploads', url);
        if (fs.existsSync(absolutePath)) {
          console.log(`El archivo ${url} sí existe en ${absolutePath}`);
          fs.unlinkSync(absolutePath);
          status = true;
        } else {
          console.log(`El archivo ${url} no existe.`);
          status = false;
        }
      } catch (error) {
        // Manejar errores durante la eliminación de archivos
        // console.error('Error al eliminar archivos:', error);
        status = false;
      }
    });

    return status;
  } catch (error) {
    // Manejar errores generales
    console.error('Error en la función deleteFiles:', error);
    return false;
  }
};
