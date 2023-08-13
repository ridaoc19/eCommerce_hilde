import React, { useState } from 'react';

interface State {
  department: string[];
}

const initialState: State = {
  department: ['Mercado', 'Postres', 'Helados'],
};

const MyComponent: React.FC = () => {
  const [state, setState] = useState<State>(initialState);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

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
      {selectedDepartment && <CategoryComponent department={selectedDepartment} />}
    </div>
  );
};

export default MyComponent;


////////////////////////////////////////////////////////////////////////
interface Props {
  department: string;
}

const CategoryComponent: React.FC<Props> = ({ department }) => {
  const [category, setCategory] = useState<string[]>([]);

  const handleAddCategory = (newCategory: string) => {
    setCategory((prevCategory) => [...prevCategory, newCategory]);
  };

  return (
    <div>
      <h3>Category Component for {department}</h3>
      <div>
        <h4>Categories:</h4>
        <ul>
          {category.map((cat, index) => (
            <li key={index}>{cat}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Enter a new category"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddCategory(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

