// import Form from './Form';
import { useContext, useEffect } from "react";
import { CreateContext } from "../../../hooks/useContext";
import { IContext } from "../../../interfaces/hooks/context.interface";
import { IUser } from "../../../interfaces/user.interface";
import { useAppDispatch } from "../../../redux/hooks";
import { productsGet } from "../../../redux/reducers/product/actions";
import Category from "./category/index";
import Department from "./department";
import Subcategory from "./subCategory";
import Products from "./product";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Route, createRequest } from "../../../services/productApi";

// import CrudForm from './department/ejemplo';

export namespace IInventory {
  export type ItemRole = {
    id: number;
    value: string;
    type: string;
    roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
  };
}

function Inventory() {
  const dispatchRedux = useAppDispatch();
  const { dashboard: { state: { inventory: { department, category, subcategory } } } }: IContext.IContextData = useContext(CreateContext)!;
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({ queryKey: ['product'], queryFn: () => createRequest(Route.ProductRequest).withRoute({}) })
  if (data) queryClient.setQueryData(['product'], data);
  // if (isLoading) return <>Loading...</>

  // if (error) return <>'An error has occurred: ' {+ error}</>
  console.log(isLoading, "loading");
  console.log(error, "error");
  console.log(data, "data");


  useEffect(() => {
    dispatchRedux(productsGet({ routes: 'request' }));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {<div className="super_inventory">
        <div className="department">
          <h2>Departamento</h2>
          <Department />
        </div>
        <div className="department">
          <h2>Categoría</h2>
          {department && <Category />}
        </div>
        <div className="department">
          <h2>Subcategoría</h2>
          {category && <Subcategory />}
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