import { Request, Response } from "express";
import { products } from "../../core/utils/helpers";
import { splitString } from "../../core/utils/splitString";
import Category from "../category/model";
import Product from "../product/model";
import Subcategory from "./model";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function subcategoryCreate(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const subcategory = await Subcategory.create({ name, categoryId: categoryId });

    await Category.findByIdAndUpdate(categoryId, { $push: { subcategoriesId: subcategory._id } });

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Creación subcategories exitosa",
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

export async function subcategoryEdit(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { _id } = req.params;

    await Subcategory.findByIdAndUpdate(_id, { name }, { new: true });

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Subcategories Editada exitosamente",
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

export async function subcategoryDelete(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const subcategory = await Subcategory.findByIdAndDelete(_id);
    if (!subcategory) throw new Error("El categoría no existe");

    // category
    await Category.findByIdAndUpdate(subcategory.categoryId, { $pull: { subcategoriesId: _id } });

    // product
    if (subcategory && subcategory.productsId.length > 0) {
      subcategory.productsId.forEach(async (productId) => {
        await Product.findByIdAndDelete(productId);
      });
    }

    const updatedProducts = await products();
    return res.status(200).json({
      message: "Eliminación subcategory en cascada exitosa",
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




