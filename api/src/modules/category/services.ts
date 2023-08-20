import { Request, Response } from "express";
import { products } from "../../core/utils/helpers";
import { splitString } from "../../core/utils/splitString";
import Department from "../department/model";
import Product from "../product/model";
import Subcategory from "../subcategory/model";
import Category from "./model";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function categoryCreate(req: Request, res: Response) {
  try {
    const { departmentId } = req.params;
    const category = await Category.create({ ...req.body, departmentId: departmentId });

    await Department.findByIdAndUpdate(departmentId, { $push: { categoriesId: category._id } });

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Creación categoría exitosa",
      products: updatedProducts,
    });

  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


export async function categoryEdit(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { _id } = req.params;

    await Category.findByIdAndUpdate(_id, { name }, { new: true });

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Categoría Editada exitosamente",
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

export async function categoryDelete(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const category = await Category.findByIdAndDelete(_id);
    if (!category) throw new Error("El categoría no existe");

    // department
    await Department.findByIdAndUpdate(category.departmentId, { $pull: { categoriesId: _id } });
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

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Eliminación categoría en cascada exitosa",
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



