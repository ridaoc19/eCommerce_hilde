import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CreateContext } from "../../../hooks/useContext";
import { IContext } from "../../../interfaces/hooks/context.interface";
import { IProduct } from '../../../interfaces/product.interface';
import { IUser } from "../../../interfaces/user.interface";
import { MakeProductsRequestReturn } from "../../../services/productApi";
import Category from "./category";
import Department from "./department";
import Products from "./product/information";
import SupplyProducts from './product/supplyProducts';
import Subcategory from "./subCategory";

export namespace IInventory {
  export type ItemRole = {
    id: number;
    value: string;
    type: string;
    roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
  };
}

function Inventory() {
  const queryClient = useQueryClient()
  const { products }: MakeProductsRequestReturn = queryClient.getQueryData(IProduct.PRODUCT_NAME_QUERY)!
  const isLoading = queryClient.isFetching(IProduct.PRODUCT_NAME_QUERY); // isLoading es true si la consulta está en progreso
  const { dashboard: { state: { inventory: { department_id, category_id, subcategory_id, products_id } } } }: IContext.IContextData = useContext(CreateContext)!;

  const category = products?.find(dep => dep._id === department_id)?.categoriesId
  const subcategory = products?.find(dep => dep._id === department_id)?.categoriesId.find(cat => cat._id === category_id)?.subcategoriesId
  const product = products?.find(dep => dep._id === department_id)?.categoriesId.find(cat => cat._id === category_id)?.subcategoriesId.find(sub => sub._id === subcategory_id)?.productsId
  const supplyProducts = products?.find(dep => dep._id === department_id)?.categoriesId.find(cat => cat._id === category_id)?.subcategoriesId.find(sub => sub._id === subcategory_id)?.productsId.find(pro => pro._id === products_id)

  return (
    <div>
      {<div className="super_inventory">
        <div className="department">
          <h2>Departamento</h2>
          {isLoading
            ? <div>Cargando Departamentos...</div>
            : <Department department={products} />}
        </div>
        <div className="department">
          <h2>Categoría</h2>
          {department_id && category && <Category category={category} />}
          {/* {department_id && category && <Category category={category} />} */}
        </div>
        <div className="department">
          <h2>Subcategoría</h2>
          {category_id && subcategory && <Subcategory subcategory={subcategory} />}
        </div>
      </div>}

      {<div className="admin_inventory">
        <div className="department">
          <h2>Products</h2>
          {subcategory_id && product && <Products products={product} />}
          {products_id && supplyProducts && <SupplyProducts product={supplyProducts} />}
        </div>

      </div>}
    </div>
  );
}

export default Inventory;