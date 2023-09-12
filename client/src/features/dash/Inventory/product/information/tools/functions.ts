import { InitialState, ProductsProps } from "../interface.products";


type HandleClickEdit = (data: { products: ProductsProps['products'], state: InitialState, value: string }) => { response: InitialState }

export const handleClickEdit: HandleClickEdit = ({ products, state, value }) => {
  console.log(products);
  let response = state;
  const updatedList = products?.filter(prod => prod._id !== value) || [];
  const editedProducts = products?.find(prod => prod._id === value);
  if (editedProducts) {
    let { _id, name, price, description, specification, images } = editedProducts;
    response = {
      ...state,
      productsList: updatedList,
      selectedProduct: {
        ...state.selectedProduct, productId: _id, requestData: {
          name, price, description,
          specification: specification.map(({ key, value }) => {
            return { key, value };
          }),
          images
        }
      }
    };
  }
  return { response };
};
