import React from 'react';
import { IProduct } from '../../../../interfaces/product.interface';
import ProductPopup from './ProductPopup';

export interface DataProductDetail {
  breadcrumb: [IProduct.Department['name'], IProduct.Category['name'], IProduct.Subcategory['name']]
  product: IProduct.Product
}

interface DataProductDetailProps {
  product: DataProductDetail;
}

const ProductDetail: React.FC<DataProductDetailProps> = ({ product }) => {
  return (
    <div>
      <ProductPopup>
        <div className='breadcrumb'>
          {product.breadcrumb.map((bread, index) => (
            <span key={index}>{bread}{index < product.breadcrumb.length - 1 && <span>{' > '}</span>}</span>
          ))}
        </div>
        <div className='name'>
          <h3>{product.product.name}</h3>
        </div>
        <div className='price'>
          <h4>{product.product.price}</h4>
        </div>
        <div className='images'>
          {product.product.images.map((img, ind) => (
            <div key={ind}><img src={img} alt={ind.toString()} /></div>
          ))}
        </div>
        <div className='description'>
          {product.product.description}
        </div>
        <div className='specification'>
          {product.product.specification.map((spe, index) => (
            <div key={index}>
              {Object.entries(spe).map(([key, value]) => (
                <div key={key}>
                  <span>{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ProductPopup>
    </div>
  );
};

export default ProductDetail;
