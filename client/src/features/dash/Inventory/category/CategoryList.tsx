import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { ButtonName, CategoryListProps } from "./interface.category";

const CategoryList: React.FC<CategoryListProps> = ({ categoryList, handleOnClick }) => {
  // const { findItemById } = useProductFilter()
  const { dashboard: { dispatch: dispatchContext, state: { inventory: { category_id }, permits: { inventory_category } } } }: IContext.IContextData = useContext(CreateContext)!;

  return (
    <div>
      <ul>
        {categoryList?.map((cat, index) => (
          <li key={index}>
            {inventory_category &&
              <>
                <button name={ButtonName.Edit} value={cat._id} onClick={handleOnClick}>Edit</button>
                <button name={ButtonName.Delete} value={cat._id} onClick={handleOnClick}>Delete</button>
              </>
            }
            <span onClick={() => {
              dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'category_id', value: cat._id } })
              // dispatchContext({ type: ActionTypeDashboard.BREADCRUMB_UPDATE, payload: { name: null, value: findItemById({ id: cat._id }).breadcrumb } })
            }}>
              {cat.name}
            </span>
          </li>
        ))}
      </ul>
      {category_id && inventory_category && <button name={ButtonName.Add} onClick={handleOnClick}>Nueva categoría</button>}
    </div>
  );
}

export default CategoryList;