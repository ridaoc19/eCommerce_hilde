import React, { useContext, useEffect } from 'react';
import { ButtonName, HandleOnChange, HandleOnClick, SelectedProducts } from '.';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';

interface ProductsFormProps {
  selectedProducts: SelectedProducts;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

const ProductsForm: React.FC<ProductsFormProps> = ({ selectedProducts, handleOnChange, handleOnClick }) => {
  const { dashboard: { state: { inventory: { products } } } }: IContext.IContextData = useContext(CreateContext)!;

  useEffect(() => {
    console.log(selectedProducts.images);

    if (selectedProducts.images.length === 0) {
      for (let index = 0; index < 3; index++) {
        const inputElement = document.getElementById(`input__images-${index}`) as HTMLInputElement | null;
        if (inputElement) {
          inputElement.value = '';
        }
      }
    }
  }, [selectedProducts.images]);

  return (
    <div>
      {!products && (
        <>
          <div className='input'>
            <div className='name'>
              <input type="text" name='name' placeholder='Nombre' value={selectedProducts.name} onChange={handleOnChange} />
            </div>

            <div className='price'>
              <input type="text" name='price' placeholder='Precio' value={selectedProducts.price} onChange={handleOnChange} />
            </div>

            <div className='description'>
              <input type="text" name='description' placeholder='Descripción' value={selectedProducts.description} onChange={handleOnChange} />
            </div>

            <div className='specification'>
              {selectedProducts.specification.map((spec, index) => (
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
              ))}
              <button name={ButtonName.AddSpecification} onClick={handleOnClick}>Agregar especificación</button>
            </div>

            <div className='images'>
              <input id={`input__images-`} className='input__images' type='file' name='images' onChange={handleOnChange} />
              {selectedProducts.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  width={200}
                  alt={`${index}`}
                />
              ))}
            </div>
          </div>

          <div className="-button">
            <div>
              <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
              <button name={ButtonName.Save} onClick={handleOnClick}>{selectedProducts._id ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsForm;
