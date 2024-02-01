import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { AppDataSource } from '../../db/postgres';
import { findParentUUID } from '../navigation/findParentUUID';

const filesMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const route = req.originalUrl.split('/').filter(Boolean);
    const entity = route[0];
    const method = route[1];
    const UUID = route[2];
    const host = req.headers.host;
    const body = req.body;

    if (method === 'edit' || method === 'delete') {
      if (findParentUUID(UUID)) {
        try {
          // Importar la entidad dinámicamente
          const dynamicEntity = await import(`../../../modules/${entity}/entity`);

          // Obtener el objeto queryBuilder
          const queryBuilder = await AppDataSource
            .getRepository(dynamicEntity.default)
            .createQueryBuilder(entity)
            .where(`${entity}.${entity}_id = :id`, { id: UUID })
            .getOne();

          if (!!queryBuilder && Object.keys(queryBuilder).some(e => e.includes('image'))) {
            // Obtener las imágenes filtradas
            const filteredImages = Object.entries(queryBuilder).flatMap(([key, value]) => {
              if (key.startsWith('image')) {
                const images = Array.isArray(value) ? value : [value];
                const filtersImagesLocal = images.filter(e => e.includes(host));
                const mapFilter = filtersImagesLocal.length > 0 ? filtersImagesLocal.map(e => e.split(`${req.headers.host}/uploads/`)[1]) : [];
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
              console.log({body, filteredImages})
              if (Object.keys(body).length > 0) {
                const filterBody = Object.entries(body).flatMap(([key, value]) => {
                  if (key.startsWith('image')) {
                    const images = Array.isArray(value) ? value : [value];
                    const filtersImagesLocal = images.filter(e => e.includes(host!));
                    const mapFilter = filtersImagesLocal.length > 0 ? filtersImagesLocal.map(e => e.split(`${req.headers.host}/uploads/`)[1]) : []
                    return mapFilter;
                  }
                  return [];
                });

                const filterDelete = filteredImages.filter(e => !filterBody.includes(e))

                console.log({filterDelete})
                if (filterDelete.length > 0) {
                  // Eliminar archivos y continuar con el middleware
                  if (deleteFiles(filteredImages)) {
                    return next();
                  }
                }
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

const deleteFiles = (filteredImages: string[]): boolean => {
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
        console.error('Error al eliminar archivos:', error);
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







// import { NextFunction, Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';
// import { AppDataSource } from '../../db/postgres';
// import { findParentUUID } from '../navigation/findParentUUID';


// const filesMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
//   const route = req.originalUrl.split('/').filter(Boolean);
//   const entity = route[0];
//   const method = route[1];
//   const UUID = route[2]
//   const host = req.headers.host
//   const body = req.body
//   // const body = { otro: "d", imagestil: "http://localhost:3001/uploads/85b50016-fd06-4f69-9a52-13a2cd1738bc-image_desktop.jpeg", images_ital: "http://localhost:3001/uploads/95b50016-fd06-4f69-9a52-13a2cd1738bc-image_desktop.jpeg" }

//   if (method === 'edit' || method === 'delete') {
//     if (findParentUUID(UUID)) {
//       import(`../../../modules/${entity}/entity`)
//         .then(async (dynamicEntity) => {
//           const queryBuilder = await AppDataSource
//             // .getRepository(VariantEntity)
//             // .createQueryBuilder("variants")
//             // .where(`variants.variant_id = :id`, { id: "4b8f95d7-5aa7-4189-b521-17964aebf8be" })
//             // .where(`variants.variant_id = :id`, { id: "fab6ba42-63f8-471e-b167-d2a579c45e00" })
//             .getRepository(dynamicEntity.default)
//             .createQueryBuilder(entity)
//             .where(`${entity}.${entity}_id = :id`, { id: UUID })
//             .getOne()

//           if (!!queryBuilder) {
//             if (Object.keys(queryBuilder).some(e => e.includes('image'))) {
//               const filteredImages = Object.entries(queryBuilder).flatMap(([key, value]) => {
//                 if (key.startsWith('image')) {
//                   const images = Array.isArray(value) ? value : [value];
//                   const filtersImagesLocal = images.filter(e => e.includes(host));
//                   const mapFilter = filtersImagesLocal.length > 0 ? filtersImagesLocal.map(e => e.split(`${req.headers.host}/uploads/`)[1]) : []
//                   return mapFilter;
//                 }
//                 return [];
//               });

//               if (method === 'delete' && filteredImages.length > 0) {
//                 deleteFiles(filteredImages)
//                 next();
//                 // filteredImages.forEach((url: string) => {
//                 //   try {
//                 //     const absolutePath = path.resolve(__dirname, '../../../../uploads', url);

//                 //     if (fs.existsSync(absolutePath)) {
//                 //       console.log(`El archivo ${url} sí existe en ${absolutePath}`);
//                 //       fs.unlinkSync(absolutePath);
//                 //     } else {
//                 //       console.log(`El archivo ${url} no existe.`);
//                 //       // Aquí puedes manejar el caso en que el archivo no existe
//                 //     }
//                 //   } catch (error) {
//                 //     errorHandlerCatch({ error, res });
//                 //   }
//                 // });
//               }


//               if (method === 'edit') {
//                 // if (method === 'delete') {
//                 if (Object.keys(body).length > 0) {
//                   const filterBody = Object.entries(body).flatMap(([key, value]) => {
//                     if (key.startsWith('image')) {
//                       const images = Array.isArray(value) ? value : [value];
//                       const filtersImagesLocal = images.filter(e => e.includes(host!));
//                       const mapFilter = filtersImagesLocal.length > 0 ? filtersImagesLocal.map(e => e.split(`${req.headers.host}/uploads/`)[1]) : []
//                       return mapFilter;
//                     }
//                     return [];
//                   });

//                   const filterDelete = filteredImages.filter(e => !filterBody.includes(e))

//                   if (filterDelete.length > 0) {
//                     deleteFiles(filteredImages)
//                   }
//                 }
//                 next();
//               }

//             }
//           }
//           next();
//         })
//       next()
//     }
//     next()
//   }

//   next();
// };

// export default filesMiddleware;


// const deleteFiles = (filteredImages: string[]): boolean => {
//   let status = false

//   filteredImages.forEach((url: string) => {
//     try {
//       const absolutePath = path.resolve(__dirname, '../../../../uploads', url);

//       if (fs.existsSync(absolutePath)) {
//         console.log(`El archivo ${url} sí existe en ${absolutePath}`);
//         fs.unlinkSync(absolutePath);
//         return status = true
//       } else {
//         console.log(`El archivo ${url} no existe.`);
//         return status = false
//       }
//     } catch (error) {
//       return status = false
//       // errorHandlerCatch({ error, res });
//     }
//   });
//   return status
// }
