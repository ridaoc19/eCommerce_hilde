import { useContext } from 'react';
import { CreateContext } from '../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import { IContext } from "../../../../../interfaces/hooks/context.interface";
import { ButtonName, DepartmentListProps } from "./interface.department";

const DepartmentList: React.FC<DepartmentListProps> = ({ departmentList, isLoading, handleOnClick }) => {
  const { dashboard: { dispatch: dispatchContext, state: { inventory: { department_id }, permits: { inventory_department } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {departmentList?.map((dept, index) => (
          <li key={index}>
            {inventory_department &&
              <>
                <button disabled={isLoading} name={ButtonName.Edit} value={dept._id} onClick={handleOnClick}>Edit</button>
                <button disabled={isLoading} name={ButtonName.Delete} value={dept._id} onClick={handleOnClick}>Delete</button>
              </>
            }
            <button disabled={isLoading} className='button_link' onClick={() => {
              dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'department_id', value: dept._id } })
            }
            }>
              {dept.name}
            </button>
          </li>
        ))}
      </ul>
      {department_id && inventory_department && <button disabled={isLoading} name={ButtonName.Add} onClick={handleOnClick}>Nuevo Departamento</button>}
    </div >
  );
}

export default DepartmentList;