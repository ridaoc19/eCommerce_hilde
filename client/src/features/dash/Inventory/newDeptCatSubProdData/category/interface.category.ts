import { IProduct } from "../../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, RequestMap, Route, makeProductsRequest } from "../../../../../services/productApi";

export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel'
}

export interface CategoryProps {
  category: IProduct.Category[];
}

export interface InitialState {
  categoryList: CategoryProps['category'];
  selectedCategory: Pick<RequestMap[Route.CategoryCreate], 'departmentId' | 'requestData'> & Pick<RequestMap[Route.CategoryEdit], 'requestData'> & Pick<RequestMap[Route.CategoryDelete], 'categoryId'>;
  validationError: { name: string };
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export type CategoryListProps = {
  categoryList: CategoryProps['category'];
  isLoading: boolean;
  handleOnClick: HandleOnClick;
};

export interface CategoryFormProps extends CategoryProps {
  state: InitialState
  isLoading: boolean;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

export const callApiCategory = async (selectedCategory: InitialState['selectedCategory']): Promise<MakeProductsRequestReturn> => {
  const { departmentId, categoryId, requestData } = selectedCategory;
  if (categoryId.length === 0 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.CategoryCreate).withOptions({ departmentId, requestData });
    return response; // Devolver el resultado de la llamada API
  }
  if (categoryId.length > 6 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.CategoryEdit).withOptions(selectedCategory);
    return response; // Devolver el resultado de la llamada API
  }
  if (categoryId.length > 6 && requestData.name.length === 0) {
    const response = await makeProductsRequest(Route.CategoryDelete).withOptions({ categoryId })
    return response;
  }
  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return { message: "error personal department", products: [] };
}
