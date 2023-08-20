// import Form from './Form';
import { useContext, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { productsGet } from "../../../redux/reducers/product/actions";
import Department from "./department";
import Category from "./category/index";
import Subcategory from "./subCategory";
import { IContext } from "../../../interfaces/hooks/context.interface";
import { CreateContext } from "../../../hooks/useContext";
// import CrudForm from './department/ejemplo';

function Inventory() {
  const dispatchRedux = useAppDispatch();
  const { dashboard: { state: { inventory: { department, category } } } }: IContext.IContextData = useContext(CreateContext)!;

  useEffect(() => {
    dispatchRedux(productsGet({ routes: 'request' }));
  }, []);

  return (
    <div>
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
      {/* <CrudForm /> */}

      {/* <Form /> */}
    </div>
  );
}

export default Inventory;