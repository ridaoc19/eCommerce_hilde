import { IProduct } from "../../../../interfaces/product.interface"
import { CategoryCallProps } from "../../../../redux/reducers/product/actions"
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
  selectedCategory: Omit<RequestMap[Route.CategoryCreate], 'route'> | Omit<RequestMap[Route.CategoryEdit], 'route'> | Omit<RequestMap[Route.CategoryEdit], 'route'>;
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void
export type SelectedCategory = Pick<CategoryCallProps, '_id' | 'name'>

export interface CategoryFormProps {
  selectedCategory: InitialState['selectedCategory']
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

type State = 'delete' | 'edit' | 'create'
export const callApiCategory = async ({ selectedCategory, state }: { selectedCategory: InitialState['selectedCategory'], state: State }): Promise<MakeProductsRequestReturn> => {
  const { requestData } = selectedCategory;

  switch (state) {
    case 'create':
      if ('departmentId' in selectedCategory) {
        const response = await makeProductsRequest(Route.CategoryCreate).withOptions({ departmentId: selectedCategory.departmentId, requestData })
        return response;
      }
      break;
    case 'edit':
      if ('categoryId' in selectedCategory) {
        const response = await makeProductsRequest(Route.CategoryEdit).withOptions({ categoryId: selectedCategory.categoryId, requestData })
        return response;
      }
      break;
    case 'delete':
      if ('categoryId' in selectedCategory) {
        const response = await makeProductsRequest(Route.CategoryDelete).withOptions({ categoryId: selectedCategory.categoryId })
        return response;
      }
      break;

    default:
      break;
  }

  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return { message: "error personal department", products: [] };
}