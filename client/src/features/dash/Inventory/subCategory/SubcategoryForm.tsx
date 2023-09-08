import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ButtonName, SubcategoryFormProps } from './interface.subcategory';


function SubcategoryForm({ selectedSubcategory, handleOnChange, handleOnClick }: SubcategoryFormProps) {
  const { dashboard: { state: { inventory: { subcategory }, permits: { inventory_subcategory } } } }: IContext.IContextData = useContext(CreateContext)!;
  return (
    <div>
      {!subcategory && inventory_subcategory && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar nueva sub categoría"
              name='name'
              value={selectedSubcategory.requestData.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedSubcategory.subcategoryId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SubcategoryForm;