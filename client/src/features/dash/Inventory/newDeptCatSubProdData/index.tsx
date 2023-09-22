import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../../../hooks/useContext";
import useProductFilter, { BreadcrumbItem } from "../../../../hooks/useProductFilter";
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { IProduct } from '../../../../interfaces/product.interface';
import { IUser } from "../../../../interfaces/user.interface";
import Category from "./category";
import Department from "./department";
import Products from "./product/addProduct";
import SupplyProducts from './product/supplyProducts';
import Subcategory from "./subCategory";
import { ActionTypeDashboard } from "../../../../hooks/useContext/dash/reducer";

export namespace IInventory {
  export type ItemRole = {
    id: number;
    value: string;
    type: string;
    roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
  };
}

export interface ItemType {
  type: string;
  department: Omit<IProduct.Department, 'categoriesId'> & {
    data: IProduct.Department[];
  };
  category: Omit<IProduct.Category, 'departmentId' | 'subcategoriesId'> & {
    data: IProduct.Category[];
  };
  subcategory: Omit<IProduct.Subcategory, 'categoryId' | 'productsId'> & {
    data: IProduct.Subcategory[];
  };
  product: IProduct.Product & {
    data: IProduct.Product[];
  };
  breadcrumb: BreadcrumbItem[];
}

function NewDeptCatSubProdData() {
  const { findItemById } = useProductFilter()
  const { dashboard: { state: { isLoadingProduct, inventory }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const { department_id, category_id, subcategory_id, products_id } = inventory;
  const queryClient = useQueryClient();
  const isLoading = queryClient.isFetching(IProduct.PRODUCT_NAME_QUERY);
  const [state, setState] = useState<ItemType>({} as ItemType)

  useEffect(() => {
    const valueInventory = Object.values(inventory).filter(e => e).at(-1) || "";
    setState(findItemById({ id: valueInventory }))
    // eslint-disable-next-line
  }, [inventory, isLoading])

  return (
    <>
      {!!isLoading && !isLoadingProduct && <div>Actualizando Productos...</div>}
      {isLoadingProduct || !state.type
        ? <div>Cargando Productos...</div>
        : <div>
          <div className="super_breadcrumb">
            <h4> {state.breadcrumb.map((item, index) => (
              <span key={item._id}>
                <button value={item._id} className='button_link'
                  onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: item.contextName, value: item._id } })}
                >
                  {item.name}
                </button >
                {index < state.breadcrumb?.length - 1 && ' > '}
              </span>
            ))}</h4>
          </div>
          {<div className="super_inventory">
            <div className="department">
              <h2>Departamento</h2>
              {<Department department={state.department.data} />}
            </div>
            <div className="category">
              <h2>Categoría</h2>
              {department_id && <Category category={state.category.data} />}
            </div>
            <div className="subcategory">
              <h2>Subcategoría</h2>
              {category_id && <Subcategory subcategory={state.subcategory.data} />}
            </div>
          </div>}

          {<div className="admin_inventory">
            <div className="products">
              <h2>Products</h2>
              {subcategory_id && <Products products={state.product.data} />}
              {products_id && <SupplyProducts product={state.product} />}
            </div>

          </div>}
        </div>}
    </>
  );
}

export default NewDeptCatSubProdData;