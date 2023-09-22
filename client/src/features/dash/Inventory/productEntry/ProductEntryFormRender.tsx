import { ReactNode } from "react";
import { IProduct } from "../../../../interfaces/product.interface";

function ProductEntryFormRender({ product, children }: { product: IProduct.Product, children: ReactNode }) {

  return (
    <div>
      <div className='name'>
        <h3>{product.name}</h3>
      </div>
      <div className='brand'>
        <h4>{product.brand}</h4>
      </div>
      {children}
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
    </div>
  );
}

export default ProductEntryFormRender;