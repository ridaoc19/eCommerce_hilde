import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ButtonName, DepartmentFormProps } from './interface.department';

function DepartmentForm({ selectedDepartment, validationError, handleOnChange, handleOnClick }: DepartmentFormProps) {
  const { dashboard: { state: { inventory: { department_id }, permits: { inventory_department } } } }: IContext.IContextData = useContext(CreateContext)!;
  return (
    <div>
      {!department_id && inventory_department && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar un nuevo departamento"
              name='name'
              value={selectedDepartment.requestData.name}
              onChange={handleOnChange}
            />
            {validationError.name && <div>{validationError.name}</div>}
          </div>
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedDepartment.departmentId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DepartmentForm;