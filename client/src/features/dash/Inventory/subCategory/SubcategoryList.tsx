import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { ButtonName, SubcategoryListProps } from './interface.subcategory';


const SubcategoryList: React.FC<SubcategoryListProps> = ({ subcategoryList, handleOnClick }) => {
  const { dashboard: { dispatch: dispatchContext, state: { inventory: { subcategory }, permits: { inventory_subcategory } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {subcategoryList?.map((sub, index) => (
          <li key={index}>
            {
              inventory_subcategory &&
              <>
                <button name={ButtonName.Edit} value={sub._id} onClick={handleOnClick}>Edit</button>
                <button name={ButtonName.Delete} value={sub._id} onClick={handleOnClick}>Delete</button>
              </>
            }
            <span onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'subcategory', value: sub._id } })}>
              {sub.name}
            </span>
          </li>
        ))}
      </ul>
      {subcategory && inventory_subcategory && <button name={ButtonName.Add} onClick={handleOnClick}>Nueva Subcategoría</button>}
    </div>
  );
}

export default SubcategoryList;