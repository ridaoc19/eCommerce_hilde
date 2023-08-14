import { Request, Response } from "express";
import { splitString } from "../../core/utils/splitString";
import Department from "../department/model";
import Category from "./model";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postRegistre(req: Request, res: Response) {
  try {
    const { departmentId } = req.params;
    const category = await Category.create({ ...req.body, departmentId: departmentId });

    await Department.findByIdAndUpdate(departmentId, { $push: { categoriesId: category._id } });

    res.status(201).json(category);


  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}
