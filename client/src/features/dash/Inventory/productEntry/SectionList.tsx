import InputText from "../../../../components/common/inputText/InputText";
import { ButtonName, NestedData, ProductsListProps } from "./interface.ProductEntry";
import './sectionList.scss'

function SectionList({ state, handleOnChange, handleOnClick }: ProductsListProps) {
  const { data } = state
  return (
    <>
      <div className={`section-list__container`}>


        {Object.keys(data).map((nameEntry, index) => {
          const nameKey = nameEntry as keyof NestedData
          const title = nameKey === 'department' ? 'Departamentos' : nameKey === 'category' ? 'Categorías' : nameKey === 'subcategory' ? 'Subcategorías' : 'Productos'
          const placeholder = nameKey === 'department' ? 'Tecnología' : nameKey === 'category' ? 'Televisores' : nameKey === 'subcategory' ? 'Smart TV' : 'Samsung L500'

          return (
            <div key={index} className={`section-list__box product-entry-${nameKey}`}>
              <div className="section-list__content">

                <div className="section-list__title">
                  <h2>{title}</h2>
                </div>

                <div className="section-list__search">
                  <InputText name={nameEntry} value={state.changeList[nameKey]} placeholder={placeholder} handleChange={handleOnChange} />
                </div>

                <div className="section-list__list">
                  {data[nameKey].map((item) => (
                    // {data[nameKey].map(({ _id, name }) => (
                    <div key={item._id}>
                      <button
                        name={nameKey === 'product' ? ButtonName.FilterOpenForm : ButtonName.FilterProduct}
                        onClick={handleOnClick}
                        value={item._id}
                      >
                        {'department' in item ? item.department : 'category' in item ? item.category : 'subcategory' in item ? item.subcategory : 'product' in item ? item.product : ""}
                      </button>
                    </div>
                  )
                  )}
                </div>


              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default SectionList;