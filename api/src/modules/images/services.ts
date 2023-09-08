import { Request, Response } from "express";
import fs, { readdirSync } from 'fs';
import fsExtra from 'fs-extra';
import { splitString } from "../../core/utils/splitString";
import path from "path";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function imageCreate(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'error al cargar imagen' });
    }

    return res.json({ message: 'Imagen cargada correctamente', imageUrl: req.file.path });

  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


export async function imageEdit(req: Request, res: Response) {
  try {
    const { imageId } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: 'error al cargar imagen' });
    }

    const imagePath = path.join(`./`, 'uploads', imageId);
    fs.unlinkSync(imagePath)
    return res.json({ message: 'Imagen editada correctamente', imageUrl: req.file.path });

  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}



export async function imageDelete(req: Request, res: Response) {
  try {
    // let imageId = req.params.imageId.replace("uploads\\", "");
    const imagePath = path.join(`./`, 'uploads', req.params.imageId);
    fs.unlinkSync(imagePath)

    return res.json({ message: 'Imagen eliminada', imageUrl: "" });

  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function imageRequestAll(req: Request, res: Response) {
  try {
    const folderPath = './uploads'; // Cambia esto a la ruta de tu carpeta

    // Obtener el contenido de la carpeta
    // fs.readdir(folderPath, (err, files) => {
    //   if (err) {
    //     console.error('Error al leer la carpeta:', err);
    //     return;
    //   }

    //   // Iterar sobre los archivos y eliminar cada uno
    //   files.forEach((file) => {
    //     const filePath = path.join(folderPath, file);

    //     // Verificar si el elemento es un archivo
    //     fs.stat(filePath, (statErr, stats) => {
    //       if (statErr) {
    //         console.error(`Error al verificar ${filePath}:`, statErr);
    //         return;
    //       }

    //       if (stats.isFile()) {
    //         // Eliminar el archivo
    //         fs.unlink(filePath, (unlinkErr) => {
    //           if (unlinkErr) {
    //             console.error(`Error al eliminar ${filePath}:`, unlinkErr);
    //           } else {
    //             console.log(`Se ha eliminado ${filePath}`);
    //           }
    //         });
    //       }
    //     });
    //   });

    // Finalmente, elimina la carpeta vacía
    //   fsExtra.remove(folderPath, (removeErr) => {
    //     if (removeErr) {
    //       console.error(`Error al eliminar la carpeta ${folderPath}:`, removeErr);
    //     } else {
    //       console.log(`Se ha eliminado la carpeta ${folderPath} y su contenido.`);
    //     }
    //   });
    // });
    const data = readdirSync(folderPath)
    return res.json({ message: 'Imagen editada correctamente', data });

  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}