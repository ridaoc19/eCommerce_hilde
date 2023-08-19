import { Request, Response } from "express";
import { splitString } from "../../core/utils/splitString";
import Category from "../category/model";
import Product from "../product/model";
import Subcategory from "../subcategory/model";
import Department from "./model";
import { products } from "../../core/utils/helpers";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function departmentGet(req: Request, res: Response) {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function departmentPost(req: Request, res: Response) {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


export async function departmentPut(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { _id } = req.params;

    await Department.findByIdAndUpdate(_id, { name }, { new: true });
    
    const updatedProducts = await products();
    return res.status(200).json({
      message: "Departamento Editado exitosamente",
      products: updatedProducts,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function departmentDelete(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const department = await Department.findByIdAndDelete(_id);
    if (!department) {
      throw new Error("El departamento no existe");
    }

    // category
    department.categoriesId.forEach(async (categoryId) => {
      const category = await Category.findByIdAndDelete(categoryId);
      // subcategory
      if (category && category.subcategoriesId.length > 0) {
        category.subcategoriesId.forEach(async (subcategoryId) => {
          const subcategory = await Subcategory.findByIdAndDelete(subcategoryId);
          // product
          if (subcategory && subcategory.productsId.length > 0) {
            subcategory.productsId.forEach(async (productId) => {
              await Product.findByIdAndDelete(productId);
            });
          }
        });
      }
    });

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Eliminación en cascada exitosa",
      products: updatedProducts,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


