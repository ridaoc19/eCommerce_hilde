import { Request, Response } from "express";
import { products } from "../../core/utils/helpers";
import { splitString } from "../../core/utils/splitString";
import Subcategory from "../subcategory/model";
import Product from "./model";

// function fetchCount(info: any) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 8000)
//   );
// }

export async function productGet(_req: Request, res: Response) {
  try {
    const updatedProducts = await products();
    res.status(200).json({
      message: "Productos completo",
      products: updatedProducts,
    });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function postCreate(req: Request, res: Response) {
  try {
    const { subcategoryId } = req.params;
    const product = await Product.create({ ...req.body, subcategoryId: subcategoryId });

    await Subcategory.findByIdAndUpdate(subcategoryId, { $push: { productsId: product._id } });

    const updatedProducts = await products();
    res.status(200).json({
      message: "product creado",
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

export async function productEdit(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    await Product.findByIdAndUpdate(productId, req.body, { new: true });

    const updatedProducts = await products();
    res.status(200).json({
      message: "Productos Editados exitosamente",
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

export async function productDelete(req: Request, res: Response) {
  try {
    const { productsId } = req.params;
    const product = await Product.findByIdAndDelete(productsId);
    if (!product) throw new Error("El categoría no existe");

    // subcategory
    await Subcategory.findByIdAndUpdate(product.subcategoryId, { $pull: { productsId: productsId } });

    const updatedProducts = await products();
    res.status(200).json({
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


///////// PRODUCT ENTRY //////
export async function productEntry(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    await Product.findByIdAndUpdate(productId, req.body, { new: true });

    const updatedProducts = await products();
    res.status(200).json({
      message: "Variantes ingresadas exitosamente",
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
