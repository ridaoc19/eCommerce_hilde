import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ButtonName, DepartmentFormProps } from './interface.department';

function DepartmentForm({ department, state, isLoading, handleOnChange, handleOnClick }: DepartmentFormProps) {
  const { dashboard: { state: { inventory: { department_id }, permits: { inventory_department } } } }: IContext.IContextData = useContext(CreateContext)!;
  const { selectedDepartment: { departmentId, requestData: { name } }, validationError } = state;

  let message = `Actualizando '${department.find(nam => nam._id === departmentId)?.name}' por '${name}'...`
  if (departmentId.length === 0 && name.length > 0) message = `Creando a '${name}'...`
  if (departmentId.length > 6 && name.length === 0) message = `Eliminando a '${department.find(nam => nam._id === departmentId)?.name}'...`

  return (
    <div>
      {!department_id && inventory_department && (
        <>
          <div className='input'>
            <input
              type="text"
              placeholder="Ingresar un nuevo departamento"
              name='name'
              value={name}
              onChange={handleOnChange}
            />
            {validationError.name && <div>{validationError.name}</div>}
            {isLoading && message}
          </div>
          <div className="-button">
            <div>
              <button disabled={isLoading} name={ButtonName.Clean} onClick={handleOnClick} >Limpiar</button>
              <button disabled={isLoading} name={ButtonName.Save} onClick={handleOnClick}>{departmentId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DepartmentForm;