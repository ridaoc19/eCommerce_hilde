import React from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';

const Departments: React.FC = () => {
  const product = useAppSelector(selectProductsData)

  return (
    <div>
      <div>
        <h3>Departments:</h3>
        <ul>
          {product?.map((dept, index) => (
            <li key={index} >
              {/* <li key={index} onClick={() => setSelectedDepartment(dept._id)}> */}
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


