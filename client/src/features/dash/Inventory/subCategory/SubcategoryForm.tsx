import { useContext } from 'react';
import { ButtonName, HandleOnChange, HandleOnClick, SelectedSubcategory } from '.';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';

interface SubcategoryFormProps {
  selectedSubcategory: SelectedSubcategory
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

function SubcategoryForm({ selectedSubcategory, handleOnChange, handleOnClick }: SubcategoryFormProps) {
  const { dashboard: { state: { inventory: { subcategory } } } }: IContext.IContextData = useContext(CreateContext)!;
  return (
    <div>
      {!subcategory && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar nueva sub categoría"
              name='name'
              value={selectedSubcategory.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedSubcategory._id ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SubcategoryForm;