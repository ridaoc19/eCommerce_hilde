import React, { useState } from 'react';
import ProductEntryList from './ProductEntryList';

// interface ProductEntryProps {
//   product: IProduct.Product;
// }

const ProductEntry: React.FC = () => {
  const [] = useState();
  // const { dashboard: { state: { inventory: { department_id } }, } }: IContext.IContextData = useContext(CreateContext)!
  // const queryClient = useQueryClient();
  // const data: MakeProductsRequestReturn | undefined = queryClient.getQueryData(IProduct.PRODUCT_NAME_QUERY);
  // const isLoading = queryClient.isFetching(IProduct.PRODUCT_NAME_QUERY);

  // console.log(isLoading, products);

  return (
    <div>
      <ProductEntryList />
      {/* <ProductEntryForm product={product} /> */}
    </div>
  );
};

export default ProductEntry;
