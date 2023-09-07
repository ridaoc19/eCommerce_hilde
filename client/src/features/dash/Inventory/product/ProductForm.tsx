import React, { useContext, useEffect } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { ButtonName, ProductsFormProps } from './interface.products';



const ProductsForm: React.FC<ProductsFormProps> = ({ selectedProduct, handleOnChange, handleOnClick }) => {
  const { dashboard: { state: { inventory: { products } } } }: IContext.IContextData = useContext(CreateContext)!;

  useEffect(() => {
    if (selectedProduct.requestData.images.length === 0) {
      for (let index = 0; index < 3; index++) {
        const inputElement = document.getElementById(`input__images-${index}`) as HTMLInputElement | null;
        if (inputElement) {
          inputElement.value = '';
        }
      }
    }
  }, [selectedProduct.requestData.images]);

  console.log(selectedProduct.requestData.specification);
  

  return (
    <div>
      {!products && (
        <>
          <div className='input'>
            <div className='name'>
              <input type="text" name='name' placeholder='Nombre' value={selectedProduct.requestData.name} onChange={handleOnChange} />
            </div>

            <div className='price'>
              <input type="text" name='price' placeholder='Precio' value={selectedProduct.requestData.price} onChange={handleOnChange} />
            </div>

            <div className='description'>
              <input type="text" name='description' placeholder='Descripción' value={selectedProduct.requestData.description} onChange={handleOnChange} />
            </div>

            <div className='specification'>
              {selectedProduct.requestData.specification.map((spec, index) => {
                
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
                    <input
                      type="text"
                      name="specificationValue"
                      placeholder="valor"
                      data-index={index}
                      value={spec.value}
                      onChange={handleOnChange}
                    />
                  </div>
                )
              })}
              <button name={ButtonName.AddSpecification} onClick={handleOnClick}>Agregar especificación</button>
            </div>

            <div className='images'>
              <input id={`input__images-`} className='input__images' type='file' name='images' onChange={handleOnChange} />
              {selectedProduct.requestData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  // src={URL.createObjectURL(image)}
                  width={200}
                  alt={`${index}`}
                />
              ))}
            </div>
          </div>
          {/* <Form /> */}
          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedProduct.productId ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsForm;
