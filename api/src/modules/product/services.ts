import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { splitString } from "../../core/utils/splitString";
import Product from "./model";
import Department from "../department/model";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postRegistre(req: Request, res: Response) {
  try {
    console.log(req)
    if (!req.files) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // const imageName = uuidv4() + req.file.originalname;
    // req.file.path = `uploads/${imageName}`;
    return res.json({ message: 'Image uploaded successfully', imageUrl: req.files });
    //   const {
    //     department,
    //     category,
    //     subcategory,
    //     price,
    //     specification,
    //     description,
    //   } = req.body;

    //   let imagePaths: string[] = [];
    //   if (Array.isArray(req.files)) {
    //     imagePaths = req.files.map((file: Express.Multer.File) => file.path);
    //   }

    //   const product = new Product({
    //     images: imagePaths,
    //     department,
    //     category,
    //     subcategory,
    //     price,
    //     specification,
    //     description,
    //   });

    // let response =  await product.save();

    //   res.status(201).json({ message: 'Product uploaded successfully', response, imagePaths });











  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


export async function getProduct(req: Request, res: Response) {
  try {
    const departamentos = await Department.find()
      .populate({
        path: 'categories',
        populate: {
          path: 'subcategories',
          // populate: {
          //   path: 'products',
          // },
        },
      })
      .exec();
    res.json(departamentos);
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}
