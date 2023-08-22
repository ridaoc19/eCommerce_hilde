import { useContext } from 'react';
import { ButtonName, HandleOnClick } from ".";
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { IProduct } from "../../../../interfaces/product.interface";

type ProductsListProps = {
  productsList: IProduct.Product[];
  handleOnClick: HandleOnClick;
};

const ProductsList: React.FC<ProductsListProps> = ({ productsList, handleOnClick }) => {
  const { dashboard: { dispatch: dispatchContext, state: { permits: { inventory_product } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {productsList?.map((prod, index) => (
          <li key={index}>
            {
              inventory_product &&
              <>
                <button name={ButtonName.Edit} value={prod._id} onClick={handleOnClick}>Edit</button>
                <button name={ButtonName.Delete} value={prod._id} onClick={handleOnClick}>Delete</button>
              </>
            }
            <span onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'products', value: prod._id } })}>{prod.name}</span>
          </li>
        ))}
      </ul>
      {inventory_product && <button name={ButtonName.Add} onClick={handleOnClick}>Nuevo Producto</button>}
    </div>
  );
}

export default ProductsList;