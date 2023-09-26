import { ButtonName, ProductEntryFormProps, colors } from './interface.ProductEntry';

function ProductEntryForm({ state, handleOnClick, handleOnChange }: ProductEntryFormProps) {
  const { selectedProduct: { requestData: { variants } }, changeForm } = state;

  return (
    <div>
      {/* <ProductEntryFormRender product={product}> */}
      {/* <div className='images'>
        {images?.map((img, ind) => (
          <div key={ind}><img src={`${process.env.REACT_APP_SERVER_FILE}/${img}`} alt={ind.toString()} width={'200'} /></div>
        ))}
      </div> */}


      <div className='variants'>
        <div>
          <ul>
            <li>
              <span>Size</span>
              <span>Color</span>
              <span>Purchase Price</span>
              <span>Selling Price</span>
              <span>Stock</span>
            </li>
            {variants.map(({ size, color, purchasePrice, sellingPrice, stock }, index) => (
              <li key={index}>
                <span>{size}</span>
                <span style={{ backgroundColor: color }} >color</span>
                <span>{purchasePrice}</span>
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
          <input
            type="text"
            name="size"
            placeholder="Tamaño"
            value={changeForm.size}
            onChange={handleOnChange}
          />
          {/* {validationError.specificationKey && <span>{validationError.specificationKey}</span>} */}
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

          {/* {validationError.specificationValue && <span>{validationError.specificationValue}</span>} */}
          <input
            type="text"
            name="purchasePrice"
            placeholder="Precio compra"
            value={changeForm.purchasePrice.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            onChange={handleOnChange}
          />
          {/* {validationError.specificationValue && <span>{validationError.specificationValue}</span>} */}
          <input
            type="text"
            name="sellingPrice"
            placeholder="Precio venta"
            value={changeForm.sellingPrice.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            onChange={handleOnChange}
          />
          {/* {validationError.specificationValue && <span>{validationError.specificationValue}</span>} */}
          <input
            type="number"
            name="stock"
            placeholder="Cuantos"
            value={changeForm.stock}
            onChange={handleOnChange}
          />
          {/* {validationError.specificationValue && <span>{validationError.specificationValue}</span>} */}
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
