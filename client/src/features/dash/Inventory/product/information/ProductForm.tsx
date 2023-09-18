import React, { useContext } from 'react';
import { CreateContext } from '../../../../../hooks/useContext';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import { ButtonName, ProductsFormProps } from './interface.products';

const ProductsForm: React.FC<ProductsFormProps> = ({ products, isLoading, state, temporaryImages, handleOnChange, handleOnClick }) => {
  const { dashboard: { state: { inventory: { products_id } } } }: IContext.IContextData = useContext(CreateContext)!;
  const { selectedProduct: { productId, requestData }, validationError } = state;

  let message = `Actualizando '${products.find(nam => nam._id === productId)?.name}' por '${requestData.name}'...`
  if (productId.length === 0 && requestData.name.length > 0) message = `Creando a '${requestData.name}'...`
  if (productId.length > 6 && requestData.name.length === 0) message = `Eliminando a '${products.find(nam => nam._id === productId)?.name}'...`

  return (
    <div>
      {!products_id && (
        <>
          <div className='input'>
            <div className='name'>
              <input type="text" name='name' placeholder='Nombre' value={requestData.name} onChange={handleOnChange} />
              {validationError.name && <div>{validationError.name}</div>}
            </div>

            <div className='price'>
              <input type="text" name='price' placeholder='Precio' value={requestData.price} onChange={handleOnChange} />
              {validationError.price && <div>{validationError.price}</div>}
            </div>

            <div className='description'>
              <input type="text" name='description' placeholder='Descripción' value={requestData.description} onChange={handleOnChange} />
              {validationError.description && <div>{validationError.description}</div>}
            </div>

            <div className='specification'>
              {requestData.specification.map((spec, index) => {

                return (
                  <div key={index}>
                    <input
                      type="text"
                      name="specificationKey"
                      placeholder="clave"
                      data-index={index}
                      value={spec.key}
                      onChange={handleOnChange}
                    />
                    {validationError.specificationKey && <span>{validationError.specificationKey}</span>}
                    <input
                      type="text"
                      name="specificationValue"
                      placeholder="valor"
                      data-index={index}
                      value={spec.value}
                      onChange={handleOnChange}
                    />
                    {validationError.specificationValue && <span>{validationError.specificationValue}</span>}
                    <button
                      disabled={isLoading}
                      name={ButtonName.RemoveSpecification}
                      data-index={index}
                      onClick={handleOnClick}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              })}
              {validationError.specification && <span>{validationError.specification}</span>}
              <button disabled={isLoading} name={ButtonName.AddSpecification} onClick={handleOnClick}>Agregar especificación</button>
            </div>

            <div className='images'>
              <input id={`input__images-`} multiple className='input__images' type='file' name='images' onChange={handleOnChange} />
              {temporaryImages.get.map((image, index) => (
                <div key={index}>
                  <img src={URL.createObjectURL(image)} width={200} alt={`${index}`} />
                  <button disabled={isLoading} name={ButtonName.FileDelete} data-type={'file'} value={index} onClick={handleOnClick}>Eliminar Imagen</button>
                </div>
              ))}
              {requestData.images.map((image, index) => (
                <div key={index}>
                  <img src={`${process.env.REACT_APP_SERVER_FILE}/${image}`} width={200} alt={`${index}`} />
                  <button disabled={isLoading} name={ButtonName.FileDelete} data-type={'url'} value={index} onClick={handleOnClick}>Eliminar Imagen</button>
                </div>
              ))}
            </div>
            {validationError.images && <span>{validationError.images}</span>}
          </div>
          {/* <Form /> */}
          {isLoading && message}
          <div className="-button">
            <div>
              <button disabled={isLoading} name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button disabled={isLoading} name={ButtonName.Save} onClick={handleOnClick}>{productId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsForm;
