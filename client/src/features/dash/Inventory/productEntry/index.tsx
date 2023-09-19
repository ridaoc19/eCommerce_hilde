import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { IProduct } from '../../../../interfaces/product.interface';
import { MakeProductsRequestReturn } from '../../../../services/productApi';
import ProductEntryList from './ProductEntryList';

// interface ProductEntryProps {
//   product: IProduct.Product;
// }

const ProductEntry: React.FC = () => {
  // const { dashboard: { state: { inventory: { department_id } }, } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const data: MakeProductsRequestReturn | undefined = queryClient.getQueryData(IProduct.PRODUCT_NAME_QUERY);
  // const isLoading = queryClient.isFetching(IProduct.PRODUCT_NAME_QUERY);

  const products = data?.products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId)
  // console.log(isLoading, products);

  return (
    <div>
      {products && <ProductEntryList />}
      {/* <ProductEntryForm product={product} /> */}
    </div>
  );
};

export default ProductEntry;
