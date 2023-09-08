import { Request, Response } from "express";
import fs from 'fs';
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