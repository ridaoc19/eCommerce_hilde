import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { productsGet } from '../../../../redux/reducers/product/actions';
import { selectProductsData } from '../../../../redux/reducers/product';

interface State {
  department: string[];
}

const initialState: State = {
  department: ['Mercado', 'Postres', 'Helados'],
};

const Departments: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const product = useAppSelector(selectProductsData)
  const [state, setState] = useState<State>(initialState);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
console.log(state);

  useEffect(() => {
    dispatchRedux(productsGet({ routes: "request" }));
  }, [])


  const handleAddDepartment = (newDepartment: string) => {
    setState((prevState) => ({
      ...prevState,
      department: [...prevState.department, newDepartment],
    }));
  };

  return (
    <div>
      <h2>My Component</h2>
      <div>
        <h3>Departments:</h3>
        <ul>
          {product?.map((dept, index) => (
            <li key={index} onClick={() => setSelectedDepartment(dept._id)}>
              {dept.name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Enter a new department"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddDepartment(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      {selectedDepartment}
    </div>
  );
};

export default Departments;


