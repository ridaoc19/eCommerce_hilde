import * as fsExtra from 'fs-extra';
import * as multer from "multer";
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
      file.path = `http://${req.headers.host}/uploads/${imageName}`
      // const key = file.originalname.split('.')[0]
      // req.body = { ...req.body, [file.originalname.split('.')[0]]: `http://${req.headers.host}/uploads/${imageName}` };

      cb(null, imageName);
      // cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage })
  return { upload }
}