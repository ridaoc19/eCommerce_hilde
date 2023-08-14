import { Request, Response } from "express";
import { splitString } from "../../core/utils/splitString";
import Category from "../category/model";
import Subcategory from "./model";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postRegistre(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const subcategory = await Subcategory.create({ ...req.body, categoryId: categoryId });

    await Category.findByIdAndUpdate(categoryId, { $push: { subcategoriesId: subcategory._id } });

    res.status(201).json(subcategory);


  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}
