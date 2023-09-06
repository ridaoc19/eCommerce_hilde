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
  selectedSubcategory: Pick<RequestMap[Route.SubCategoryCreate], 'categoryId'> & Pick<RequestMap[Route.SubCategoryEdit], 'requestData'> & Pick<RequestMap[Route.SubCategoryDelete], 'subcategoryId'>;
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export interface SubcategoryFormProps {
  selectedSubcategory: InitialState['selectedSubcategory']
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

export type SubcategoryListProps = {
  subcategoryList: SubcategoryProps['subcategory'];
  handleOnClick: HandleOnClick;
};


type State = 'delete' | 'edit' | 'create'

export const callApiSubcategory = async ({ selectedSubcategory, state }: { selectedSubcategory: InitialState['selectedSubcategory'], state: State }): Promise<MakeProductsRequestReturn> => {

  let response: MakeProductsRequestReturn = { message: "error personal department", products: [] }; // Inicializar con un valor predeterminado

  switch (state) {
    case 'create':
      response = await makeProductsRequest(Route.SubCategoryCreate).withOptions({ categoryId: selectedSubcategory.categoryId, requestData: selectedSubcategory.requestData })
      break;

    case 'edit':
      response = await makeProductsRequest(Route.SubCategoryEdit).withOptions({ subcategoryId: selectedSubcategory.subcategoryId, requestData: selectedSubcategory.requestData })
      break;

    case 'delete':
      response = await makeProductsRequest(Route.SubCategoryDelete).withOptions({ subcategoryId: selectedSubcategory.subcategoryId })
      break;

    default:
      break;
  }

  return response;
}
