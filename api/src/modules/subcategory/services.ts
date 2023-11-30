import { Request, Response } from "express";
import { StatusHTTP } from "../../core/utils/enums";
import { products } from "../../core/utils/helpers";
import { errorHandlerCatch } from "../../core/utils/send/errorHandler";
import { successHandler } from "../../core/utils/send/successHandler";
import Category from "../category/model";
import Product from "../product/model";
import Subcategory from "./model";

// function fetchCount(info: any) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 8000)
//   );
// }

export async function subcategoryCreate(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const subcategory = await Subcategory.create({ name, categoryId: categoryId });

    await Category.findByIdAndUpdate(categoryId, { $push: { subcategoriesId: subcategory._id } });

    const updatedProducts = await products();
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'subcategory_create',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se creo subcategoría exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}

export async function subcategoryEdit(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { _id } = req.params;

    await Subcategory.findByIdAndUpdate(_id, { name }, { new: true });

    const updatedProducts = await products();
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'subcategory_edit',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se edito subcategoría exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
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
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'subcategory_delete',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se elimino subcategoría exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}