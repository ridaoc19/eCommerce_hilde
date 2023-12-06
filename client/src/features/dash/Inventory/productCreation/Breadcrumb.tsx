import { StatusSection } from "../../../../hooks/useMutationProduct";
import { HandleClick } from "../../../auth/login";
import { ButtonName, InitialState } from "./helpers";

function Breadcrumb({ state: { breadcrumb }, handleOnClick, status }: { handleOnClick: HandleClick, state: InitialState, status: StatusSection }) {
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

      <div className="error-general">
        {status.productError?.errors.some(e => e.field === 'general') && <div className="form__error-back--content">
          {status.productError?.errors.some(e => e.field === 'general') &&
            <ul>
              {status.productError.errors.filter(e => e.field === 'general').map((e, i) => (
                <span key={i}>{e.message}</span>
              ))}
            </ul>
          }
        </div>}
      </div>
    </div>
  );
}

export default Breadcrumb;