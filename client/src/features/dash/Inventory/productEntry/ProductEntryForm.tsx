import { StatusSection } from '../../../../hooks/useMutationProduct';
import { HandleChangeTextSelect, HandleClick } from '../../../../interfaces/global.interface';
import { UserInput } from '../../../auth/login';
import { ButtonName, InitialStateEntry, colors } from './helpers';
export interface ProductEntryFormProps {
  state: InitialStateEntry;
  // isLoading: boolean;
  handleOnChange: HandleChangeTextSelect;
  handleOnClick: HandleClick;
  status: StatusSection
}

function ProductEntryForm({ state, handleOnClick, handleOnChange, status }: ProductEntryFormProps) {
  const { changeList: { product: { images, variants } }, changeForm } = state;

  return (
    <div>
      {/* <ProductEntryFormRender product={product}> */}
      <div className='images'>
        {images?.map((img, ind) => (
          <div key={ind}><img src={`${process.env.REACT_APP_SERVER_FILE}/${img}`} alt={ind.toString()} width={'200'} /></div>
        ))}
      </div>


      <div className='variants'>
        <div>
          <ul>
            <li>
              <span> Size</span>
              <span> Color</span>
              <span> Purchase Price</span>
              <span> Selling Price</span>
              <span> Stock</span>
            </li>
            {variants.map(({ size, color, sellingPrice, stock }, index) => (
              <li key={index}>
                <span>{size}</span>
                <span style={{ backgroundColor: color }} >color</span>
                <span>{sellingPrice}</span>
                <span>{stock}</span>
                <button name={ButtonName.EditVariant} value={index} onClick={handleOnClick}>Editar</button>
                <button name={ButtonName.RemoveVariant} value={index} onClick={handleOnClick}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>


        {/*                   esto es formulario                     */}
        <div className='form'>
          {(Object.keys(state.changeForm).filter(key => !['color', '_id'].includes(key)) as (keyof Omit<InitialStateEntry['changeForm'], 'color' | '_id'>)[]).map((item) => (
            <UserInput
              key={item}
              styleClass={`login__account-info--${item}`}
              errorMessage={state.error[item] || status.productError?.errors.find(e => e.field === item)?.message}
              input={{
                type: 'text',
                placeholder: item === 'sellingPrice' ? 'Precio de venta' : item === 'size' ? 'Tamaño' : 'Existencia',
                value: item !== 'sellingPrice' ? state.changeForm[item] : state.changeForm[item].toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }),
                handleOnChange, name: item
              }}
            />
          ))}

          <div>
            {/* <label htmlFor="colorSelect">Selecciona un color:</label> */}
            <select id="colorSelect" name="color" value={changeForm.color} onChange={handleOnChange}>
              <option value="">Seleccione un color</option>
              {colors.map((colorObj, index) => {
                return (
                  <option key={index} value={colorObj.code} style={{ backgroundColor: colorObj.code }}>
                    {colorObj.name}
                  </option>
                );
              })}
            </select>
            {changeForm.color && (
              <div style={{ backgroundColor: changeForm.color, width: '50px', height: '50px' }}></div>
            )}
          </div>
          {state.error.color && <span>{state.error.color}</span>}

          {((status.productError?.errors.find(e => e.field === 'variants')?.message)) && <div>{status.productError?.errors.find(e => e.field === 'variants')?.message}</div>}
        </div>

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

        <button name={ButtonName.AddVariant} onClick={handleOnClick}>Agregar especificación</button>
        <hr />
        <button name={ButtonName.Clean} onClick={handleOnClick} >Limpiar</button>
        <button name={ButtonName.Save} onClick={handleOnClick}>Guardar</button>
      </div>
    </div>
  );
}

export default ProductEntryForm;
