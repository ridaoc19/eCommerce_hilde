import { Request, Response } from "express";
import { StatusHTTP } from "../../core/utils/enums";
import { products } from "../../core/utils/helpers";
import { errorHandlerCatch } from "../../core/utils/send/errorHandler";
import { successHandler } from "../../core/utils/send/successHandler";
import Department from "../department/model";
import Product from "../product/model";
import Subcategory from "../subcategory/model";
import Category from "./model";

// function fetchCount(info: any) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 8000)
//   );
// }

export async function categoryCreate(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { departmentId } = req.params;

    const category = await Category.create({ name, departmentId: departmentId });

    await Department.findByIdAndUpdate(departmentId, { $push: { categoriesId: category._id } });

    const updatedProducts = await products();
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'category-create',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se creo categoría exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}


export async function categoryEdit(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { _id } = req.params;

    await Category.findByIdAndUpdate(_id, { name }, { new: true });

    const updatedProducts = await products();
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'category-edit',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se edito categoría exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
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
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'category-delete',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se elimino categoría exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}



