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

export interface SubcategoryProps {
  subcategory: IProduct.Subcategory[];
}

export interface InitialState {
  subcategoryList: SubcategoryProps['subcategory'];
  selectedSubcategory: Pick<RequestMap[Route.SubCategoryCreate], 'categoryId'> & Pick<RequestMap[Route.SubCategoryEdit], 'requestData'> & Pick<RequestMap[Route.SubCategoryDelete], 'subcategoryId'>;
  validationError: { name: string };
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export type SubcategoryListProps = {
  subcategoryList: SubcategoryProps['subcategory'];
  isLoading: boolean;
  handleOnClick: HandleOnClick;
};

export interface SubcategoryFormProps extends SubcategoryProps {
  state: InitialState;
  isLoading: boolean;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}


export const callApiSubcategory = async (selectedSubcategory: InitialState['selectedSubcategory']): Promise<MakeProductsRequestReturn> => {
  const { subcategoryId, categoryId, requestData } = selectedSubcategory;
  if (subcategoryId.length === 0 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.SubCategoryCreate).withOptions({ categoryId, requestData });
    return response; // Devolver el resultado de la llamada API
  }
  if (subcategoryId.length > 6 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.SubCategoryEdit).withOptions(selectedSubcategory);
    return response; // Devolver el resultado de la llamada API
  }
  if (subcategoryId.length > 6 && requestData.name.length === 0) {
    const response = await makeProductsRequest(Route.SubCategoryDelete).withOptions({ subcategoryId })
    return response;
  }
  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return { message: "error personal department", products: [] };
}