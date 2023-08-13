import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { departmentPosts } from '../../../../redux/reducers/product/actions';

interface State {
  department: string[];
}

const initialState: State = {
  department: ['Mercado', 'Postres', 'Helados'],
};

const Department: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const [state, setState] = useState<State>(initialState);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);


  useEffect(() => {
    dispatchRedux(departmentPosts({routes: "registre"}));
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
          {state.department.map((dept, index) => (
            <li key={index} onClick={() => setSelectedDepartment(dept)}>
              {dept}
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

export default Department;


