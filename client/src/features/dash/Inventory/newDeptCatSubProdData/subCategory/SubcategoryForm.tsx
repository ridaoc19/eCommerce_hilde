import { useContext } from 'react';
import { CreateContext } from '../../../../../hooks/useContext';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import { ButtonName, SubcategoryFormProps } from './interface.subcategory';


function SubcategoryForm({ subcategory, state, isLoading, handleOnChange, handleOnClick }: SubcategoryFormProps) {
  const { dashboard: { state: { inventory: { subcategory_id }, permits: { admin } } } }: IContext.IContextData = useContext(CreateContext)!;
  const { selectedSubcategory: { subcategoryId, requestData: { name } }, validationError } = state;

  let message = `Actualizando '${subcategory.find(nam => nam._id === subcategoryId)?.name}' por '${name}'...`
  if (subcategoryId.length === 0 && name.length > 0) message = `Creando a '${name}'...`
  if (subcategoryId.length > 6 && name.length === 0) message = `Eliminando a '${subcategory.find(nam => nam._id === subcategoryId)?.name}'...`

  return (
    <div>
      {!subcategory_id && admin && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar nueva sub categoría"
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
              <button disabled={isLoading} name={ButtonName.Save} onClick={handleOnClick}>{subcategoryId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SubcategoryForm;