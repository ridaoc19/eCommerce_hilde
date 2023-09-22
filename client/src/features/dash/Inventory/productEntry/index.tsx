import React, { useState } from 'react';
import ProductEntryForm from './ProductEntryForm';
import ProductEntryList from './ProductEntryList';
import { HandleOnClick } from './interface.ProductEntry';

const ProductEntry: React.FC = () => {
  const [state, setState] = useState("");

  const handleOnClick: HandleOnClick = (event) => {
    event.preventDefault();
    const { value } = event.target as HTMLButtonElement;
    setState(value)
  }

  return (
    <div>
      <ProductEntryList handleOnClick={handleOnClick} />
      {state && <ProductEntryForm state={state} />}
    </div>
  );
};

export default ProductEntry;
