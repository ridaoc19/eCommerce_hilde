import { Request, Response } from 'express';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import AdvertisingEntity from './entity';




export default {
  async createAdvertising(req: Request, res: Response) {
    try {
      const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);

      const newAdvertising = advertisingRepository.create(req.body);

      await advertisingRepository.save(newAdvertising);

      const allAdvertising = await getAllAdvertising()

      successHandler({
        res,
        dataDB: allAdvertising,
        json: {
          field: 'advertising_create',
          message: 'Anuncio creado correctamente',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });

    } catch (error) {
      errorHandlerCatch({req, error, res });
    }
  },
  async updateAdvertising(req: Request, res: Response) {
    try {
      const { advertising_id } = req.params;
      const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);

      const existingAdvertising = await advertisingRepository.findOne({ where: { advertising_id } });

      if (!existingAdvertising) {
        return errorHandlerRes({req, res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'category_edit', message: 'Categoría no existe' }] })
      }

      advertisingRepository.merge(existingAdvertising, req.body);
      await advertisingRepository.save(existingAdvertising);

      const allAdvertising = await getAllAdvertising()

      successHandler({
        res,
        dataDB: allAdvertising,
        json: {
          field: 'advertising_update',
          message: 'Anuncio actualizado correctamente',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({req, error, res });
    }
  },
  async deleteAdvertising(req: Request, res: Response) {
    
    try {
      const { advertising_id } = req.params;
      const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);

      const existingAdvertising = await advertisingRepository.findOne({ where: { advertising_id } });

      if (!existingAdvertising) {
        return errorHandlerRes({req, res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'advertising_delete', message: 'Anuncio no encontrado' }] })
      }

      await advertisingRepository.delete(existingAdvertising);
      // await advertisingRepository.softRemove(existingAdvertising);

      const allAdvertising = await getAllAdvertising()


      successHandler({
        res,
        dataDB: allAdvertising,
        json: {
          field: 'advertising_delete',
          message: 'Anuncio eliminado correctamente',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({req, error, res });
    }
  },
  async getAdvertising(req: Request, res: Response) {
    try {
      const allAdvertising = await getAllAdvertising()
      successHandler({
        res,
        dataDB: allAdvertising,
        json: {
          field: 'advertising_get',
          message: 'Anuncios obtenidos correctamente',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({req, error, res });
    }
  },
};


const getAllAdvertising = async (): Promise<{
  advertising_id: string;
  page: string;
  location: string;
  title: string;
  redirect: string;
  text: string;
  image_desktop: string;
  image_tablet: string;
  image_phone: string;
}[]> => {
  const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);
  const allAdvertising = await advertisingRepository.find();

  return allAdvertising
}



// export default {
//   async createAdvertising(req: Request, res: Response) {
//     const { home, product_list, product_detail, checkout } = req.body;
//     try {
//       const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);

//       // Obtener el registro existente (si hay alguno)
//       let getAd = await advertisingRepository.find();
//       let existingAdvertising = getAd[0]

//       if (!existingAdvertising) {
//         // Si no hay un registro existente, crea uno nuevo
//         existingAdvertising = new AdvertisingEntity();
//       }

//       // Concatenar los nuevos elementos con los existentes
//       if (home) {
//         existingAdvertising.home = (existingAdvertising.home || []).concat(home);
//       }
//       if (product_list) {
//         existingAdvertising.product_list = (existingAdvertising.product_list || []).concat(product_list);
//       }
//       if (product_detail) {
//         existingAdvertising.product_detail = (existingAdvertising.product_detail || []).concat(product_detail);
//       }
//       if (checkout) {
//         existingAdvertising.checkout = (existingAdvertising.checkout || []).concat(checkout);
//       }

//       // Guardar o actualizar en la base de datos
//       await advertisingRepository.save(existingAdvertising);


//       if (!existingAdvertising) {
//         return errorHandlerRes({
//           res,
//           status_code: 404,
//           status: StatusHTTP.notFound_404,
//           errors: [{ field: 'advertising_create', message: 'Error al crear el Dato' }],
//         });
//       }

//       successHandler({
//         res,
//         dataDB: [existingAdvertising],
//         json: {
//           field: 'advertising_create',
//           message: 'Dato creado',
//           status_code: 201,
//           status: StatusHTTP.created_201,
//         },
//       });
//     } catch (error) {
//       errorHandlerCatch({ error, res });
//     }
//   },

//   async updateAdvertising(req: Request, res: Response) {
//     try {
//       const { advertising_id,  } = req.params;
//       const { title, link, text, location, image, id } = req.body;

//       const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);
//       let getAd = await advertisingRepository.find();
//       let existingAdvertising = getAd[0]

//       if (!existingAdvertising) {
//         return errorHandlerRes({
//           res,
//           status_code: 404,
//           status: StatusHTTP.notFound_404,
//           errors: [{ field: 'advertising_edit', message: 'Dato no existe' }],
//         });
//       }

//       // Supongamos que deseas actualizar el objeto con un ID específico en el array 'home'
//       const targetObjectId = advertising_id;
//       const indexToUpdate = existingAdvertising.home.findIndex(obj => obj.id === targetObjectId);

//       if (indexToUpdate !== -1) {
//         // Realizar las modificaciones necesarias en el objeto con el ID específico
//         existingAdvertising.home[indexToUpdate] = {
//           ...existingAdvertising.home[indexToUpdate],
//           title,
//           link,
//           text,
//           id,
//           image,
//           location
//           // Añade todas las modificaciones necesarias
//         };
//       } else {
//         // Si no se encuentra el objeto con el ID específico, puedes manejarlo según tus necesidades
//         return errorHandlerRes({
//           res,
//           status_code: 404,
//           status: StatusHTTP.notFound_404,
//           errors: [{ field: 'advertising_edit', message: 'No se encontró el objeto con el ID específico.' }],
//         });
//       }

//       // Guardar el registro actualizado en la base de datos
//       await advertisingRepository.save(existingAdvertising);
//       successHandler({
//         res,
//         dataDB: [existingAdvertising],
//         json: {
//           field: 'advertising_update',
//           message: 'Dato actualizado',
//           status_code: 200,
//           status: StatusHTTP.success_200,
//         },
//       });
//     } catch (error) {
//       errorHandlerCatch({ error, res });
//     }
//   },

//   async getAdvertising(_req: Request, res: Response) {
//     try {

//       const existingAdvertising = await AppDataSource
//         .getRepository(AdvertisingEntity)
//         .createQueryBuilder()
//         .getMany()



//       if (!existingAdvertising) {
//         return errorHandlerRes({
//           res,
//           status_code: 404,
//           status: StatusHTTP.notFound_404,
//           errors: [{ field: 'advertising_get', message: 'Dato no encontrado' }],
//         });
//       }

//       successHandler({
//         res,
//         dataDB: [existingAdvertising],
//         json: {
//           field: 'advertising_get',
//           message: 'Dato obtenido',
//           status_code: 200,
//           status: StatusHTTP.success_200,
//         },
//       });
//     } catch (error) {
//       errorHandlerCatch({ error, res });
//     }
//   },

//   async deleteAdvertising(req: Request, res: Response) {
//     try {
//       const { advertising_id } = req.params;
//       const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);
//       const existingAdvertising = await advertisingRepository.findOne({ where: { advertising_id } });

//       if (!existingAdvertising) {
//         return errorHandlerRes({
//           res,
//           status_code: 404,
//           status: StatusHTTP.notFound_404,
//           errors: [{ field: 'advertising_delete', message: 'Dato no encontrado' }],
//         });
//       }

//       await advertisingRepository.softRemove([existingAdvertising]);

//       // if (existingAdvertising) {
//       successHandler({
//         res,
//         dataDB: [existingAdvertising],
//         json: {
//           field: 'advertising_delete',
//           message: 'Dato y todas las entidades relacionadas eliminadas lógicamente',
//           status_code: 200,
//           status: StatusHTTP.success_200,
//         },
//       });


//     } catch (error) {
//       errorHandlerCatch({ error, res });
//     }
//   },

//   async restoreAdvertising(req: Request, res: Response) {
//     try {
//       const { advertising_id } = req.params;
//       const advertisingRepository = AppDataSource.getRepository(AdvertisingEntity);
//       const existingAdvertising = await advertisingRepository.findOne({ where: { advertising_id }, });

//       if (!existingAdvertising) {
//         return errorHandlerRes({
//           res,
//           status_code: 404,
//           status: StatusHTTP.notFound_404,
//           errors: [{ field: 'advertising_restore', message: 'Dato no encontrado' }],
//         });
//       }

//       await advertisingRepository.recover(existingAdvertising);

//       successHandler({
//         res,
//         dataDB: [existingAdvertising],
//         json: {
//           field: 'advertising_restore',
//           message: 'Dato y todas las entidades relacionadas restauradas',
//           status_code: 200,
//           status: StatusHTTP.success_200,
//         },
//       });
//     } catch (error) {
//       errorHandlerCatch({ error, res });
//     }
//   },
// };
