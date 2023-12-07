import { Request, Response } from "express";
import { splitString } from "../../core/utils/splitString";
import Category from "../category/model";
import Product from "../product/model";
import Subcategory from "../subcategory/model";
import Department from "./model";
import { products } from "../../core/utils/helpers";
import { errorHandlerCatch } from "../../core/utils/send/errorHandler";
import { successHandler } from "../../core/utils/send/successHandler";
import { StatusHTTP } from "../../core/utils/enums";

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
    const { department } = req.body;
    await Department.create({ department });
    const updatedProducts = await products();
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'department_create',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se creo nuevo departamento'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}


export async function departmentPut(req: Request, res: Response) {
  try {
    const { department } = req.body;
    const { _id } = req.params;

    await Department.findByIdAndUpdate(_id, { department }, { new: true });

    const updatedProducts = await products();
   
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'department_put',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Se edito el Departamento exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
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
    fetchCount(updatedProducts)
    successHandler({
      res, dataDB: updatedProducts, filterAdd: [], filterDelete: [], json: {
        field: 'department_delete',
        status: StatusHTTP.success_200,
        status_code: 200,
        message: 'Departamento eliminado exitosamente'
      }
    })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}


