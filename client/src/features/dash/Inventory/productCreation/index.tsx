import React from 'react';
import Breadcrumb from './Breadcrumb';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { InitialState } from './helpers';
import useStateProductCreation from './useStateProductCreation';


const ProductCreation: React.FC = () => {
  const { state, handleOnClick, handleOnChangeTextArea, handleOnChange, handleOnChangeProduct, status } = useStateProductCreation();


  return (
    <div className={`section-list__container`}>
      <Breadcrumb state={state} handleOnClick={handleOnClick} status={status} />

      {Object.entries(state.data).map(([name, _valueData], index) => {
        const nameKey = name as keyof InitialState['changeList']
        const title = nameKey === 'department' ? 'Departamentos' : nameKey === 'category' ? 'Categorías' : nameKey === 'subcategory' ? 'Subcategorías' : 'Productos'

        return (
          <div key={index} className={`section-list__box product-entry-${nameKey}`}>
            <div className="section-list__content">

              <div className="section-list__title">
                <h2>{title}</h2>
              </div>

              <div className="section-list__search">
                <ProductForm
                  state={state}
                  name={name}
                  status={status}
                  handleOnChange={handleOnChange}
                  handleOnChangeProduct={handleOnChangeProduct}
                  handleOnChangeTextArea={handleOnChangeTextArea}
                  handleOnClick={handleOnClick}
                />
              </div>

              <div className="section-list__list">
                <ProductList
                  state={state}
                  status={status}
                  name={name}
                  handleOnClick={handleOnClick}
                />
              </div>

            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ProductCreation;
