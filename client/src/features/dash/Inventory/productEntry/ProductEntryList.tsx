import SectionList from './SectionList';
import { ButtonName, ProductsListProps } from './interface.ProductEntry';

function ProductEntryList({ handleOnClick, handleOnChange, state }: ProductsListProps) {
  const { breadcrumb } = state;


  return (
    <div className='product_entry-container-list'>
      <div className='product_entry-breadcrumb'>
        {breadcrumb.map((item, index) => (
          <span key={item._id}>
            <button name={ButtonName.FilterProduct} value={item._id} onClick={handleOnClick} className='button_link'>
              {item.name}
            </button >
            {index < breadcrumb.length - 1 && ' > '}
          </span>
        ))}
      </div>
      <SectionList state={state} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
    </div>
  );
}

export default ProductEntryList;
