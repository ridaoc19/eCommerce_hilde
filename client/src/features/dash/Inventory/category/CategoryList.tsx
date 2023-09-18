import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { ButtonName, CategoryListProps } from "./interface.category";

const CategoryList: React.FC<CategoryListProps> = ({ categoryList, isLoading, handleOnClick }) => {
  const { dashboard: { dispatch: dispatchContext, state: { inventory: { category_id }, permits: { inventory_category } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {categoryList?.map((cat, index) => (
          <li key={index}>
            {inventory_category &&
              <>
                <button disabled={isLoading} name={ButtonName.Edit} value={cat._id} onClick={handleOnClick}>Edit</button>
                <button disabled={isLoading} name={ButtonName.Delete} value={cat._id} onClick={handleOnClick}>Delete</button>
              </>
            }
            <button disabled={isLoading} className='button_link' onClick={() => {
              dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'category_id', value: cat._id } })
            }}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      {category_id && inventory_category && <button disabled={isLoading} name={ButtonName.Add} onClick={handleOnClick}>Nueva categoría</button>}
    </div>
  );
}

export default CategoryList;