import React from 'react';
import { IProduct } from '../../../../../../interfaces/product.interface';
import ProductPopup from './ProductPopup';
import useProductFilter from '../../../../../../hooks/useProductFilter';

interface SupplyProductsProps {
  product: IProduct.Product;
}

const SupplyProducts: React.FC<SupplyProductsProps> = ({ product }) => {
  const { findItemById } = useProductFilter()

  return (
    <div>
      <ProductPopup>
        <div className='breadcrumb'>
          <h4>{findItemById({ id: product._id }).breadcrumb}</h4>
          {/* <h4>{getBreadcrumb({ data: products, id: product._id })}</h4> */}
          {/* {product.breadcrumb.map((bread, index) => (
            <span key={index}>{bread}{index < product.breadcrumb.length - 1 && <span>{' > '}</span>}</span>
          ))} */}
        </div>
        <div className='name'>
          <h3>{product.name}</h3>
        </div>
        <div className='brand'>
          <h4>{product.brand}</h4>
        </div>
        <div className='images'>
          {product.images?.map((img, ind) => (
            <div key={ind}><img src={`${process.env.REACT_APP_SERVER_FILE}/${img}`} alt={ind.toString()} width={'200'} /></div>
          ))}
        </div>
        <div className='description'>
          {product.description}
        </div>
        <div className='specification'>
          {product.specification?.map(({ key, value }, index) => (
            <div key={index}>
              <div>{key}: {value}</div>
            </div>
          ))}
        </div>
      </ProductPopup>
    </div>
  );
};

export default SupplyProducts;
