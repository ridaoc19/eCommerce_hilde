
import React, { useContext } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';

const Category: React.FC = () => {
  const { dashboard: { state: {  }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const product = useAppSelector(selectProductsData)

  return (
    <div>
      <div>
        <h3>Departments:</h3>
        <ul>
          {product?.map((dept, index) => (
            <li key={index} onClick={()=> dispatchContext({type: ActionTypeDashboard.SELECT_INVENTORY, payload: {name: "", value: ""}})} >
              {/* <li key={index} onClick={() => setSelectedDepartment(dept._id)}> */}
              {dept.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;


