
import React, { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';

const Category: React.FC = () => {
  const { dashboard: { state: { inventory: { department, category, subcategory } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  // const dispatchRedux = useAppDispatch()
  const product = useAppSelector(selectProductsData)

  return (
    <div>
      <div>
        <h3>Category</h3>
        <ul>
          {product?.find(e => e._id === department)?.categoriesId?.map((cat, index) => (
            <li key={index} onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'category', value: cat._id } })}>
              {cat.name}
            </li>
          ))}
        </ul>
        {department && category && !subcategory && <input
          type="text"
          placeholder="Ingresar un nuevo departamento"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // handleAddDepartment(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />}
      </div>
    </div>
  );
};

export default Category;


