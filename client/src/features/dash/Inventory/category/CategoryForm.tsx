import { useContext } from 'react';
import { ButtonName, HandleOnChange, HandleOnClick, SelectedCategory } from '.';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';

interface CategoryFormProps {
  selectedCategory: SelectedCategory
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

function CategoryForm({ selectedCategory, handleOnChange, handleOnClick }: CategoryFormProps) {
  const { dashboard: { state: { inventory: { category }, permits: { inventory_category } } } }: IContext.IContextData = useContext(CreateContext)!;
  return (
    <div>
      {!category && inventory_category && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar nueva categoría"
              name='name'
              value={selectedCategory.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedCategory._id ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryForm;