import { useContext } from 'react';
import { ButtonName, HandleOnClick } from ".";
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { IProductRedux } from "../../../../interfaces/product.interface";

type DepartmentListProps = {
  departmentList: IProductRedux.InitialState["products"];
  handleOnClick: HandleOnClick;
};

const DepartmentList: React.FC<DepartmentListProps> = ({ departmentList, handleOnClick }) => {
  const { dashboard: { dispatch: dispatchContext, state: { inventory: { department } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {departmentList?.map((dept, index) => (
          <li key={index}>
            <button name={ButtonName.Edit} value={dept._id} onClick={handleOnClick}>Edit</button>
            <button name={ButtonName.Delete} onClick={handleOnClick}>Delete</button>
            <span onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'department', value: dept._id } })}>
              {dept.name}
            </span>
          </li>
        ))}
      </ul>
      {department && <button name={ButtonName.Add} onClick={handleOnClick}>Nuevo Departamento</button>}
    </div>
  );
}

export default DepartmentList;