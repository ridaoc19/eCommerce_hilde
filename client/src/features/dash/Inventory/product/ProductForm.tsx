import { useContext } from 'react';
import { ButtonName, HandleOnChange, HandleOnClick, SelectedProducts } from '.';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';

interface ProductsFormProps {
  selectedProducts: SelectedProducts
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

function ProductsForm({ selectedProducts, handleOnChange, handleOnClick }: ProductsFormProps) {
  const { dashboard: { state: { inventory: { products } } } }: IContext.IContextData = useContext(CreateContext)!;
  return (
    <div>
      {!products && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar nueva sub categoría"
              name='name'
              value={selectedProducts.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedProducts._id ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsForm;