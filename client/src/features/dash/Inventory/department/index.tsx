import React, { useContext } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';

const Departments: React.FC = () => {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const product = useAppSelector(selectProductsData)

  return (
    <div>
      <div>
        <h3>Departments:</h3>
        <ul>
          {product?.map((dept, index) => (
            <li key={index} onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'department', value: dept._id } })}>
              {dept.name}
            </li>
          ))}
        </ul>
        {/* <input
          type="text"
          placeholder="Enter a new department"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddDepartment(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        /> */}
      </div>
    </div>
  );
};

export default Departments;


