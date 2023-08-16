
import React, { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';

const Subcategory: React.FC = () => {
  const { dashboard: { state: { inventory: { department, category } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const product = useAppSelector(selectProductsData)
  console.log(product?.find(e => e._id === department)?.categoriesId.find(s => s._id === category)?.subcategoriesId
  );

  return (
    <div>
      <div>
        <h3>SubCategory</h3>
        <ul>
          {product?.find(e => e._id === department)?.categoriesId.find(s => s._id === category)?.subcategoriesId?.map((sub, index) => (
            <li key={index} onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'subcategory', value: sub._id } })}>
              {sub.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Subcategory;


