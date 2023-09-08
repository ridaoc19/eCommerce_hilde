import { IProduct } from "../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, RequestMap, Route, makeProductsRequest } from "../../../../services/productApi";

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
  selectedCategory: Pick<RequestMap[Route.CategoryCreate], 'departmentId'> & Pick<RequestMap[Route.CategoryEdit], 'requestData'> & Pick<RequestMap[Route.CategoryDelete], 'categoryId'>;
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export interface CategoryFormProps {
  selectedCategory: InitialState['selectedCategory']
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

export type CategoryListProps = {
  categoryList: CategoryProps['category'];
  handleOnClick: HandleOnClick;
};

type State = 'delete' | 'edit' | 'create'
export const callApiCategory = async ({ selectedCategory, state }: { selectedCategory: InitialState['selectedCategory'], state: State }): Promise<MakeProductsRequestReturn> => {
  const { departmentId, categoryId, requestData } = selectedCategory;

  let response: MakeProductsRequestReturn = { message: "error personal department", products: [] };

  switch (state) {
    case 'create':
      response = await makeProductsRequest(Route.CategoryCreate).withOptions({ departmentId: departmentId, requestData })
      break;

    case 'edit':
      response = await makeProductsRequest(Route.CategoryEdit).withOptions({ categoryId: categoryId, requestData })
      break;

    case 'delete':
      response = await makeProductsRequest(Route.CategoryDelete).withOptions({ categoryId: categoryId })
      break;

    default:
      break;
  }

  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return response
}