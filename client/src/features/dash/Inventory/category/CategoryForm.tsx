import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ButtonName, CategoryFormProps } from './interface.category';


function CategoryForm({ category, state, isLoading, handleOnChange, handleOnClick }: CategoryFormProps) {
  const { dashboard: { state: { inventory: { category_id }, permits: { inventory_category } } } }: IContext.IContextData = useContext(CreateContext)!;
  const { selectedCategory: { categoryId, requestData: { name } }, validationError } = state;

  let message = `Actualizando '${category.find(nam => nam._id === categoryId)?.name}' por '${name}'...`
  if (categoryId.length === 0 && name.length > 0) message = `Creando a '${name}'...`
  if (categoryId.length > 6 && name.length === 0) message = `Eliminando a '${category.find(nam => nam._id === categoryId)?.name}'...`

  return (
    <div>
      {!category_id && inventory_category && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar nueva categoría"
              name='name'
              value={name}
              onChange={handleOnChange}
            />
            {validationError.name && <div>{validationError.name}</div>}
            {isLoading && message}
          </div>
          <div className="-button">
            <div>
              <button disabled={isLoading} name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button disabled={isLoading} name={ButtonName.Save} onClick={handleOnClick}>{categoryId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryForm;