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
import { AppDataSource } from '../../data-source';
import FilesEntity from './entity';

interface Files {
  file_id: string,
  entity: string,
  location: string,
  name: string,
  typeFile: string,
  url: string,
  selected: boolean
};

export default {
  async imagesCreateAndDelete(req: Request, res: Response) {
    const entity = req.query.entity as string
    const location = req.query.location as string
    const name = req.query.name as string
    const typeFile = req.query.typeFile as string
    const deleteBody: string[] = req.body.delete
    const filesRepository = AppDataSource.getRepository(FilesEntity);

    try {
      const imagesCreated: Omit<Files, 'file_id' | 'selected'>[] | [] = req.files && Array.isArray(req.files) ? req.files.map(file => {
        // const imagesCreated: { fileId: string, url: string, entity: string, location: string, name: string }[] | [] = req.files && Array.isArray(req.files) ? req.files.map(file => {
        return {
          fileId: file.filename,
          url: `${process.env.FILES_FILTER_IMAGES}/files/${file.filename}`,
          entity,
          location,
          typeFile,
          name,
        }
      }) : []

      if (imagesCreated.length > 0) {
        const newFiles = filesRepository.create(imagesCreated);
        await filesRepository.save(newFiles);
      }

      if (Array.isArray(deleteBody) && deleteBody.length > 0) {
        const findDelete = await filesRepository
          .createQueryBuilder('files')
          .where('files.url IN (:...url)', { url: deleteBody })
          .getMany();

        if (!deleteFiles(findDelete.map(e => e.fileId))) return errorHandlerRes({
          res, req,
          status_code: 404,
          status: StatusHTTP.notFound_404,
          errors: [{ field: 'file_delete', message: 'Error al eliminar imágenes' }],
        });
        await filesRepository
          .createQueryBuilder('files')
          .delete()
          // .from(FilesEntity) // Reemplaza YourEntity con el nombre de tu entidad
          .where('files.file_id IN (:...ids)', { ids: findDelete.map(e => e.file_id) })
          .execute();
      }

      const files = await getFiles({ entity, location, name, typeFile, selected: false })

      successHandler({
        res,
        dataDB: {
          data: files,
          delete: deleteBody,
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
  async requestFiles(req: Request, res: Response) {
    const { entity, location, name, selected, typeFile } = req.query;
    try {

      const files = await getFiles({
        entity: entity as string,
        location: location as string,
        name: name as string,
        typeFile: typeFile as string,
        selected: selected === 'false' ? false : true
      })

      successHandler({
        res,
        dataDB: {
          data: files,
          delete: [],
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
      errorHandlerCatch(error);
    }
  },
  async addSelected(req: Request, res: Response) {
    try {
      const selected = req.query.selected === 'false' ? false : true


      if (Array.isArray(req.body.add) && req.body.add.length > 0) {
        await AppDataSource
          .getRepository(FilesEntity)
          .createQueryBuilder('files')
          .update(FilesEntity)
          .set({ selected })
          .where('files.url IN (:...url)', { url: req.body.add })
          .execute();
      }

      successHandler({
        res,
        dataDB: {
          data: [],
          delete: [],
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
      errorHandlerCatch(error);
    }
  },

  ////////////////////////////////
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

      for (let item of data) {
        item.breadcrumb = [item.department, item.category, item.subcategory]
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


      // Define el tipo del objeto que estás creando dentro del reducer
      type ImageFile = {
        fileId: string;
        url: string;
        entity: string;
        location: string;
        typeFile: string;
        name: string;
      };

      // Inicializa el acumulador con el tipo adecuado utilizando la función genérica reduce
      const variantsTotal = data.reduce<ImageFile[]>((acc, item) => {
        item.variants.forEach(el => {
          el.images.forEach(img => {
            if (!!img) {
              acc.push({
                fileId: img,
                url: `${process.env.FILES_FILTER_IMAGES}/files/${img}`,
                entity: 'variant',
                location: 'admin',
                typeFile: 'images',
                name: item.product,
              });
            }
          });
        });
        return acc;
      }, []);




      // return [...acc, ...item.variants.map(el => {
      //   return {
      //     fileId: el.images
      //   }
      // })]

      //////////////////////////////////////////
      const department = [...new Set(newData.map(({ department }) => department))]

      const totalIdCategory = newData.map(({ breadcrumb }) => breadcrumb);

      const conjunto: Set<string> = new Set(totalIdCategory.map((arr: string[]): string => JSON.stringify(arr)));
      const arraysUnicos: string[][] = Array.from(conjunto).map((str: string): string[] => JSON.parse(str));

      const newResult = department.reduce((acc, dept) => {
        const filter = arraysUnicos.filter(item => item[0] === dept)

        const newSubcategory = filter.map(([dep, cat, sub]) => {
          const breadcrumb = JSON.stringify([dep, cat, sub])
          return {
            subcategory: sub,
            children: newData.filter(e => JSON.stringify(e.breadcrumb) === breadcrumb)
          }
        })

        const newCategoryName = [...new Set(filter.map(([_dep, cat]) => cat))]
        const newCategory = newCategoryName.map((cat) => {
          return {
            category: cat,
            children: newSubcategory.filter(e => e.children.some(b => b.category === cat))
          }
        }, [])

        return [...acc, {
          department: dept,
          children: newCategory
          // newCategory,
          // newSubcategory
          // // product: newData.filter(e => e.department === dept)
        }]
      }, [])
      /////////////////////////////////////////////////////////

      ///////// cargar base datos
      const filesRepository = AppDataSource.getRepository(FilesEntity);
      if (variantsTotal.length > 0) {
        for (const { entity, fileId, location, name, typeFile, url } of variantsTotal) {
          const files = new FilesEntity();
          files.entity = entity
          files.fileId = fileId
          files.location = location
          files.name = name
          files.typeFile = typeFile
          files.url = url
          await filesRepository.save(files);
        }
      }
      ///////


      res.json({ newData, newResult, variantsTotal });


    } catch (error) {
      console.error('Error al descargar imágenes:', error);
      res.status(500).json({ error: 'Error al descargar imágenes' });
    }

  },
};


const getFiles = async ({ entity, location, name, selected, typeFile }: Omit<Files, 'file_id' | 'url'>): Promise<Files[]> => {
  try {

    let queryBuilder = AppDataSource
      .createQueryBuilder(FilesEntity, 'files')

    if (selected === false) {
      queryBuilder = queryBuilder.where('files.selected IS false')
    }

    if (selected === true) {
      queryBuilder.where('files.selected IS true')
    }

    if (entity) {
      queryBuilder = queryBuilder.andWhere('files.entity = :entity', { entity });
    }
    if (location) {
      queryBuilder = queryBuilder.andWhere('files.location = :location', { location });
    }
    if (name) {
      queryBuilder = queryBuilder.andWhere('files.name = :name', { name });
    }

    if (typeFile) {
      queryBuilder = queryBuilder.andWhere('files.typeFile = :typeFile', { typeFile });
    }

    const files = await queryBuilder.getMany();

    return files
  } catch (error) {
    throw Error
  }
}


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
        const absolutePath = path.resolve(__dirname, '..', '..', '..', 'files', url);
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
  breadcrumb: string[];
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

