import { HandleClick } from "../../../auth/login";
import { ButtonName, InitialState } from "./useStateProductCreation";

function Breadcrumb({ state: { breadcrumb }, handleOnClick }: { handleOnClick: HandleClick, state: InitialState }) {
  return (
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
  );
}

export default Breadcrumb;