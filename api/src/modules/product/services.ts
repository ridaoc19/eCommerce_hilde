import { Request, Response } from "express";
import { StatusHTTP } from "../../core/utils/enums";
import { products } from "../../core/utils/helpers";
import { errorHandlerCatch } from "../../core/utils/send/errorHandler";
import { successHandler } from "../../core/utils/send/successHandler";
import Subcategory from "../subcategory/model";
import Product from "./model";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function productGet(_req: Request, res: Response) {
  try {
    const updatedProducts = await products();
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'request',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se enviaron todos los productos'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}

export async function postCreate(req: Request, res: Response) {
  try {
    const { subcategoryId } = req.params;
    const product = await Product.create({ ...req.body, subcategoryId: subcategoryId });

    await Subcategory.findByIdAndUpdate(subcategoryId, { $push: { productsId: product._id } });

    const updatedProducts = await products();
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'product-create',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se Creo el producto exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}

export async function productEdit(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    await Product.findByIdAndUpdate(productId, req.body, { new: true });

    const updatedProducts = await products();
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'product-edit',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se edito el producto exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
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
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'product-delete',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se elimino el producto exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}


///////// PRODUCT ENTRY //////
export async function productEntry(req: Request, res: Response) {
  try {
    await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });

    const updatedProducts = await products();
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'product-entry',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se crearon variantes exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}
