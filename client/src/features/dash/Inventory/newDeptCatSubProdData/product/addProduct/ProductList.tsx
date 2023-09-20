import { useContext } from 'react';
import { CreateContext } from '../../../../../../hooks/useContext';
import { IContext } from "../../../../../../interfaces/hooks/context.interface";
import { ButtonName, ProductsListProps } from './interface.products';

const ProductsList: React.FC<ProductsListProps> = ({ productsList, isLoading, handleOnClick }) => {
  const { dashboard: { state: { inventory: { products_id }, permits: { inventory_product } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {productsList?.map((prod, index) => (
          <li key={index}>
            {
              inventory_product &&
              <>
                <button disabled={isLoading} name={ButtonName.Edit} value={prod._id} onClick={handleOnClick}>Edit</button>
                <button disabled={isLoading} name={ButtonName.Delete} value={prod._id} onClick={handleOnClick}>Delete</button>
              </>
            }
            <button disabled={isLoading} name={ButtonName.Product} className='button_link' value={prod._id} onClick={handleOnClick}>{prod.name}</button>
            {/* <span data-value={prod._id} onClick={handleOnClickProduct} > {prod.name}</span> */}
          </li>
        ))}
      </ul>
      {products_id && inventory_product && <button disabled={isLoading} name={ButtonName.Add} onClick={handleOnClick}>Nuevo Producto</button>}
    </div >
  );
}

export default ProductsList;