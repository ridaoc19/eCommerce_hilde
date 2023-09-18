import { IProduct } from "../../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, RequestMap, Route, makeProductsRequest } from "../../../../../services/productApi";




export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel',
  Product = 'product',
  AddSpecification = 'addSpecification',
  FileDelete = 'FileDelete',
  FileEdit = 'FileEdit'
}

export interface ProductsProps {
  products: IProduct.Product[];
}

export interface InitialState {
  productsList: ProductsProps['products'];
  selectedProduct: Omit<RequestMap[Route.ProductCreate], 'route'> & Omit<RequestMap[Route.ProductEdit], 'route'>;
  temporaryImages: { get: File[], delete: string[] };
  validationError: Omit<IProduct.Product, '_id' | 'subcategoryId'>;
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export type ProductsListProps = {
  productsList: InitialState['productsList'];
  isLoading: boolean;
  handleOnClick: HandleOnClick;
};

export interface ProductsFormProps extends ProductsProps, Pick<InitialState, 'temporaryImages'> {
  state: InitialState;
  isLoading: boolean;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}


type State = 'delete' | 'edit' | 'create'
export const callApiProducte = async ({ selectedProduct, state }: { selectedProduct: InitialState['selectedProduct'], state: State }): Promise<MakeProductsRequestReturn> => {
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

export const callApiProduct = async (selectedSubcategory: InitialState['selectedProduct']): Promise<MakeProductsRequestReturn> => {
  const { productId, subcategoryId, requestData } = selectedSubcategory;
  if (productId.length === 0 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.ProductCreate).withOptions({ subcategoryId, requestData });
    return response; // Devolver el resultado de la llamada API
  }
  if (productId.length > 6 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.ProductEdit).withOptions(selectedSubcategory);
    return response; // Devolver el resultado de la llamada API
  }
  if (productId.length > 6 && requestData.name.length === 0) {
    const response = await makeProductsRequest(Route.ProductDelete).withOptions({ productId })
    return response;
  }
  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return { message: "error personal department", products: [] };
}