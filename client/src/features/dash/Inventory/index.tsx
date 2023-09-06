import { IUser } from "../../../interfaces/user.interface";
import Department from "./department";
import { useQuery } from '@tanstack/react-query';
import { Route, makeProductsRequest } from "../../../services/productApi";
import { IContext } from "../../../interfaces/hooks/context.interface";
import { CreateContext } from "../../../hooks/useContext";
import { useContext } from "react";
import Category from "./category";
import Subcategory from "./subCategory";
import Products from "./product";

export namespace IInventory {
  export type ItemRole = {
    id: number;
    value: string;
    type: string;
    roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
  };
}

function Inventory() {
  // const dispatchRedux = useAppDispatch();
  const { dashboard: { state: { inventory: { department, category, subcategory } } } }: IContext.IContextData = useContext(CreateContext)!;
  // const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['product'],
    queryFn: () => makeProductsRequest(Route.ProductRequest).withOptions({}),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  let categoryData = data?.products.find(dep => dep._id === department)?.categoriesId
  let subcategoryData = data?.products.find(dep => dep._id === department)?.categoriesId.find(cat => cat._id === category)?.subcategoriesId



  return (
    <div>
      {<div className="super_inventory">
        <div className="department">
          <h2>Departamento</h2>
          {isLoading
            ? <div>Cargando Departamentos...</div>
            : isError
              ? <div>Hubo erro {JSON.stringify(error)}</div>
              : <Department department={data?.products} />}
        </div>
        <div className="department">
          <h2>Categoría</h2>
          {department && categoryData && <Category category={categoryData} />}
        </div>
        <div className="department">
          <h2>Subcategoría</h2>
          {category && subcategoryData && <Subcategory subcategory={subcategoryData} />}
        </div>
      </div>}

      {<div className="admin_inventory">
        <div className="department">
          <h2>Products</h2>
          {subcategory && <Products />}
        </div>
      </div>}
      {/* <CrudForm /> */}

      {/* <Form /> */}
    </div>
  );
}

export default Inventory;