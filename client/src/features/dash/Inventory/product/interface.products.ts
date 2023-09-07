import { IProduct } from "../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, RequestMap, Route, makeProductsRequest } from "../../../../services/productApi";




export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel',
  Product = 'product',
  AddSpecification = 'addSpecification'
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export interface ProductsProps {
  products: IProduct.Product[];
}

export interface InitialState {
  productsList: ProductsProps['products'];
  selectedProduct: Omit<RequestMap[Route.ProductCreate], 'route'> & Omit<RequestMap[Route.ProductEdit], 'route'>
  showDeleteModal: boolean;
}

export interface ProductsFormProps {
  selectedProduct: InitialState['selectedProduct'];
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

export type ProductsListProps = {
  productsList: InitialState['productsList'];
  handleOnClick: HandleOnClick;
};

type State = 'delete' | 'edit' | 'create'
export const callApiProduct = async ({ selectedProduct, state }: { selectedProduct: InitialState['selectedProduct'], state: State }): Promise<MakeProductsRequestReturn> => {
  const { productId, subcategoryId, requestData } = selectedProduct;

  let response: MakeProductsRequestReturn = { message: "error personal department", products: [] };

  switch (state) {
    case 'create':
      response = await makeProductsRequest(Route.ProductCreate).withOptions({ subcategoryId, requestData })
      break;

    case 'edit':
      response = await makeProductsRequest(Route.ProductEdit).withOptions({ productId, requestData })
      break;

    case 'delete':
      response = await makeProductsRequest(Route.ProductDelete).withOptions({ productId })
      break;

    default:
      break;
  }

  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return response
}