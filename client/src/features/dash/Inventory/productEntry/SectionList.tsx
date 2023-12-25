import InputText from "../../../../components/common/inputText/InputText";
import { HandleChangeTextSelect, HandleClick } from "../../../../interfaces/global.interface";
import { ButtonName, InitialStateEntry, } from "./helpers";
// import './sectionList.scss';

export type SectionListProps = {
  state: InitialStateEntry;
  // isLoading: boolean;
  handleOnChange: HandleChangeTextSelect;
  handleOnClick: HandleClick;
};

function SectionList({ state, handleOnChange, handleOnClick }: SectionListProps) {
  const { data } = state
  return (
    <>
      <div className={`section-list__container`}>


        {Object.keys(data).map((nameEntry, index) => {
          const nameKey = nameEntry as keyof InitialStateEntry['changeList']
          const stateChangeListValue = Object.fromEntries(Object.entries(state.changeList[nameKey]).filter(([keys]) => keys === nameKey))
          const title = nameKey === 'department' ? 'Departamentos' : nameKey === 'category' ? 'Categorías' : nameKey === 'subcategory' ? 'Subcategorías' : 'Productos'
          const placeholder = nameKey === 'department' ? 'Tecnología' : nameKey === 'category' ? 'Televisores' : nameKey === 'subcategory' ? 'Smart TV' : 'Samsung L500'

          return (
            <div key={index} className={`section-list__box product-entry-${nameKey}`}>
              <div className="section-list__content">

                <div className="section-list__title">
                  <h2>{title}</h2>
                </div>

                <div className="section-list__search">
                  <InputText name={nameEntry} value={stateChangeListValue[nameKey] as string} placeholder={placeholder} handleChange={handleOnChange} />
                </div>

                <div className="section-list__list">
                  {data[nameKey].map((item) => (
                    // {data[nameKey].map(({ _id, name }) => (
                    <div key={item._id}>
                      <button
                        className="button_filter"
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