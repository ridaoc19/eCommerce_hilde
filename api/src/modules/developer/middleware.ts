import fsExtra from 'fs-extra';
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

export const folderPath = './uploads'; // ruta de carpeta

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
  const storage = multer.diskStorage({
    destination: async function (_req, _file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const imageName = `${uuidv4()}-${file.originalname}`;
      file.path = `uploads/${imageName}`
      req.body = { ...req.body, [file.originalname.split('.')[0]]: `http://${req.headers.host}/uploads/${imageName}` };
      cb(null, imageName);
      // cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage })
  return { upload }


  // export async function checkFolderAccess({ folderPath }: { folderPath: string }) {
  //   try {
  //     await fs_folder.access(folderPath, fs_folder.constants.F_OK); // Verifica la existencia de la carpeta
  //     return await fs_folder.readdir(folderPath);
  //   } catch (err: any) {
  //     if (err.code === 'ENOENT') {
  //       // La carpeta no existe, la creamos
  //       await fs_folder.mkdir(folderPath, { recursive: true }); // Crea la carpeta de forma recursiva
  //       return 'carpeta creada'; // Devuelve verdadero si la carpeta se crea con éxito
  //     } else {
  //       console.error(`Error al verificar/acceder a la carpeta ${folderPath}:`, err);
  //       return false; // Devuelve falso en caso de otro error
  //     }
  //   }
  // }
}