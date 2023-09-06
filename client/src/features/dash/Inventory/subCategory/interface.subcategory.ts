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

export interface SubcategoryProps {
  subcategory: IProduct.Subcategory[];
}

export interface InitialState {
  subcategoryList: SubcategoryProps['subcategory'];
  selectedSubcategory: Omit<RequestMap[Route.SubCategoryCreate], 'route'> | Omit<RequestMap[Route.SubCategoryEdit], 'route'> | Omit<RequestMap[Route.SubCategoryDelete], 'route'>;
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export interface SubcategoryFormProps {
  selectedSubcategory: InitialState['selectedSubcategory']
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

type State = 'delete' | 'edit' | 'create'
export const callApiSubcategory = async ({ selectedSubcategory, state }: { selectedSubcategory: InitialState['selectedSubcategory'], state: State }): Promise<MakeProductsRequestReturn> => {

  switch (state) {
    case 'create':
      if ('categoryId' in selectedSubcategory) {
        const response = await makeProductsRequest(Route.SubCategoryCreate).withOptions({ categoryId: selectedSubcategory.categoryId, requestData: selectedSubcategory.requestData })
        return response;
      }
      break;
    case 'edit':
      if ('subcategoryId' in selectedSubcategory && 'requestData' in selectedSubcategory) {
        const response = await makeProductsRequest(Route.SubCategoryEdit).withOptions({ subcategoryId: selectedSubcategory.subcategoryId, requestData: selectedSubcategory.requestData })
        return response;
      }
      break;
    case 'delete':
      if ('subcategoryId' in selectedSubcategory) {
        const response = await makeProductsRequest(Route.SubCategoryDelete).withOptions({ subcategoryId: selectedSubcategory.subcategoryId })
        return response;
      }
      break;

    default:
      break;
  }

  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return { message: "error personal department", products: [] };
}