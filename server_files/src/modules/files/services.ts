import axios from 'axios';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as multer from "multer";
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { StatusHTTP } from '../../core/utils/send/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';

export default {
  async imagesCreateAndDelete(req: Request, res: Response) {
    try {

      const imagesCreated: string[] | [] = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : []
      if (imagesCreated.length > 0) {

      }

      if (Array.isArray(req.body.url) && req.body.url.length > 0) {
        if (!deleteFiles(req.body.url)) return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'file_delete', message: 'Error al eliminar imágenes' }],
        });
      }


      successHandler({
        res,
        dataDB: {
          imagesCreated,
          imagesDeleted: req.body.url,
        },
        json: {
          field: 'file_create',
          message: 'Imágenes actualizadas correctamente',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      console.error(error);
      errorHandlerCatch(error)
    }
  },
  async downloadImages(_req: Request, res: Response) {
    try {
      const currentDirectory = __dirname;
      const parentDirectory = path.join(currentDirectory, '..', '..', 'core', 'db', 'upload.json');

      const jsonData: Data[] = JSON.parse(fs.readFileSync(parentDirectory, 'utf-8'));
      const data = jsonData.slice(7001, 7773)
      const newData: Data[] = [];

      for (const item of data) {
        const variants: Variant[] = [];
        const index = data.indexOf(item);
        console.log(index);
        for (const variant of item.variants) {
          const images: string[] = [];

          for (const img of variant.images) {
            const imageName = await downloadImageOne(img, variant.itemId);
            if (imageName) {
              images.push(imageName);
            }
          }

          variants.push({ ...variant, images });
        }

        newData.push({ ...item, variants });
      }

      res.json({ newData });
    } catch (error) {
      console.error('Error al descargar imágenes:', error);
      res.status(500).json({ error: 'Error al descargar imágenes' });
    }

  },
  async searchImages(_req: Request, res: Response) {
    try {
      const currentDirectory = __dirname;
      const one = path.join(currentDirectory, '..', '..', 'core', 'db', 'newData.json');
      const two = path.join(currentDirectory, '..', '..', 'core', 'db', 'newData2.json');

      const jsonDataOne: Data[][] = JSON.parse(fs.readFileSync(one, 'utf-8'));
      const jsonDataTwo: Data[][] = JSON.parse(fs.readFileSync(two, 'utf-8'));

      const data = [...jsonDataOne.flat(), ...jsonDataTwo.flat()]

      const newData: Data[] = [];

      for (const item of data) {
        const variants: Variant[] = [];
        for (const variant of item.variants) {
          const images: string[] = [];

          for (const img of variant.images) {
              images.push(`${process.env.FILES_FILTER_IMAGES}/files/${img}`);
          }

          variants.push({ ...variant, images });
        }

        newData.push({ ...item, variants });
      }

      res.json({ newData });

    } catch (error) {
      console.error('Error al descargar imágenes:', error);
      res.status(500).json({ error: 'Error al descargar imágenes' });
    }

  },
};


////////////////////////////////////////////////////////////////////

const downloadImageOne = async (imageUrl: string, name: string) => {
  const destinationFolder = './files';

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  try {
    const imageName = `${uuidv4()}-variant-admin-${name}.jpg`; // Generar un nombre único para cada imagen
    const imagePath = `${destinationFolder}/${imageName}`;

    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(imagePath); // Crear un flujo de escritura al archivo completo
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    return `${imageName}`
  } catch (error) {
    console.error('Error downloading image:', imageUrl);
    return false;
  }
};

export const folderPath = './files'; // ruta de carpeta

export async function checkFolderAccess({ folderPath }: { folderPath: string }) {
  // Verificar si la carpeta existe
  fsExtra.access(folderPath, fsExtra.constants.F_OK, (err) => {
    if (err) {
      // La carpeta no existe, la creamos
      fsExtra.ensureDir(folderPath, (createErr) => {
        if (createErr) {
          console.error(`Error al crear la carpeta ${folderPath}:`, createErr);
        } else {
          console.log(`Carpeta ${folderPath} creada con éxito.`);
        }
      });
    } else {
      console.log(`La carpeta ${folderPath} ya existe.`);
    }
  });
}

export const uploadImages = () => {
  try {
    const storage = multer.diskStorage({
      destination: async function (_req, _file, cb) {
        cb(null, 'files');
      },
      filename: function (_req, file, cb) {
        const imageName = `${uuidv4()}-${file.originalname}`;
        file.path = `files/${imageName}`
        cb(null, imageName);
        // cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage })
    return { upload }
  } catch (error) {
    console.error('Error configuring multer:', error);
    throw error;
  }
};

export const deleteFiles = (filteredImages: string[]): boolean => {
  try {
    let status = false;

    filteredImages.forEach((url: string) => {
      try {
        const absolutePath = path.resolve(__dirname, '../../../../files', url);
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













export interface Data {
  productId: string;
  specification: Specification;
  product: string;
  brand: string;
  department: string;
  category: string;
  subcategory: string;
  description: string;
  benefits: string[];
  contents: string;
  warranty: string;
  variants: Variant[];
}

interface Variant {
  itemId: string
  images: string[];
  attributes: Attributes;
  videos: string[];
  price: number;
  stock: number;
  listPrice: number;
}

type Attributes = Record<string, string>

type Specification = Record<string, string>