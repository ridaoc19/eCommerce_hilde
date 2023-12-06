import { StatusSection } from "../../../../hooks/useMutationProduct";
import { HandleClick } from "../../../../interfaces/global.interface";
import { ButtonName, InitialState } from "./helpers";

interface ProductFormProps {
  state: InitialState,
  name: string,
  status: StatusSection,
  handleOnClick: HandleClick
}



function ProductList({state, name, handleOnClick}: ProductFormProps) {
  const nameKey = name as keyof InitialState['changeList']
  const filterBreadcrumb = state.breadcrumb.map(e => e.name_id).at(-1)
  const validateButton = filterBreadcrumb === "" ? 'department' : filterBreadcrumb === "department" ? 'category' : filterBreadcrumb === 'category' ? 'subcategory' : 'product'
  return (
    <>
      {state.data[nameKey].map((item) => {
        return (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              name={ButtonName.FilterProduct}
              // name={nameKey === 'product' ? ButtonName.FilterOpenForm : ButtonName.FilterProduct}
              onClick={handleOnClick}
              value={item._id}
            >
              {'department' in item ? item.department : 'category' in item ? item.category : 'subcategory' in item ? item.subcategory : 'product' in item ? item.product : ""}
            </button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {validateButton === nameKey && <>
                <button name={ButtonName.EditUpdate} value={nameKey} data-_id={item._id} data-name={name} onClick={handleOnClick}>Edit</button>
                <button name={ButtonName.Delete} value={nameKey} data-_id={item._id} onClick={handleOnClick}>{'Delete'}</button>
              </>
              }
            </div>
          </div>
        )
      })}
    </>
  );
}

export default ProductList;