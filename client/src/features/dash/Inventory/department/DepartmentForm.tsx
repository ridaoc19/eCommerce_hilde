import { useContext } from 'react';
import { ButtonName, HandleOnChange, HandleOnClick, SelectedDepartment } from '.';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';

interface DepartmentFormProps {
  selectedDepartment: SelectedDepartment
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

function DepartmentForm({ selectedDepartment, handleOnChange, handleOnClick }: DepartmentFormProps) {
  const { dashboard: { state: { inventory: { department } } } }: IContext.IContextData = useContext(CreateContext)!;
  return (
    <div>
      {!department && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar un nuevo departamento"
              name='name'
              value={selectedDepartment.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedDepartment._id ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DepartmentForm;