import { Request, Response } from "express";
import { AppDataSource } from "../../core/db/postgres";
import { MediaFilesTempoEntity } from "./entity";
import { successHandler } from "../../core/utils/send/successHandler";
import { StatusHTTP } from "../../core/utils/enums";
import { errorHandlerCatch, errorHandlerRes } from "../../core/utils/send/errorHandler";


export default {
  async createMediaTempo(req: Request, res: Response) {
    console.log(req.body, req.params)
    const { location } = req.params
    try {
      const mediaTempoRepository = AppDataSource.getRepository(MediaFilesTempoEntity);

      if (Object.keys(req.body.length > 0)) {
        const body = req.body.map((media: string[]) => { return { media, location } })
        const newMediaTempo = mediaTempoRepository.create(body);

        // Guardar el nuevo elemento en la base de datos
        await mediaTempoRepository.save(newMediaTempo);
      }
      // Obtener todos los elementos después de la creación
      const allMediaTempo = await mediaTempoRepository.find({ where: { location } });
      successHandler({
        res,
        dataDB: allMediaTempo,
        json: {
          field: 'media_tempo_create',
          message: 'Imágenes temporales creada',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async updateMediaTempo(req: Request, res: Response) {
    try {
      const { media_tempo_id } = req.params;
      const { media, location } = req.body;


      const mediaTempoRepository = AppDataSource.getRepository(MediaFilesTempoEntity);

      const existingMediaTempo = await mediaTempoRepository.findOne({ where: { media_tempo_id } });

      if (!existingMediaTempo) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'media_tempo_edit', message: 'Imágenes temporales no existe' }] })
      }

      existingMediaTempo.media = media;
      existingMediaTempo.location = location

      await mediaTempoRepository.save(existingMediaTempo);

      successHandler({
        res,
        dataDB: [existingMediaTempo],
        json: {
          field: 'media_tempo_update',
          message: 'Imágenes temporales actualizada',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async deleteMediaTempo(req: Request, res: Response) {
    try {
      const { media_tempo_id } = req.params;

      const mediaTempoRepository = AppDataSource.getRepository(MediaFilesTempoEntity);

      const existingMediaTempo = await mediaTempoRepository.findOne({ where: { media_tempo_id } });

      if (!existingMediaTempo) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'media_tempo_delete', message: 'Imágenes temporales no encontrado' }] })
      }

      await mediaTempoRepository.remove(existingMediaTempo);

      successHandler({
        res,
        dataDB: [existingMediaTempo],
        json: {
          field: 'media_tempo_delete',
          message: 'Imágenes temporales eliminada',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
  async getMediaTempo(req: Request, res: Response) {
    try {
      const { media_tempo_id } = req.params;

      const mediaTempoRepository = AppDataSource.getRepository(MediaFilesTempoEntity);

      const media_tempo = await mediaTempoRepository.findOne({ where: { media_tempo_id } });

      if (!media_tempo) {
        return errorHandlerRes({ res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'media_tempo_get', message: 'Imágenes temporales no encontrado' }] })
      }

      successHandler({
        res,
        dataDB: [media_tempo],
        json: {
          field: 'media_tempo_get',
          message: 'Imágenes temporales obtenida',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
};