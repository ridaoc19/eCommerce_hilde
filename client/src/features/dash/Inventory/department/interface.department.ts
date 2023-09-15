import React from 'react';
import { IProduct } from "../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, RequestMap, Route, makeProductsRequest } from '../../../../services/productApi';


export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel'
}

export interface DepartmentProps {
  department: IProduct.Department[];
}

export interface InitialState {
  departmentList: DepartmentProps['department'];
  selectedDepartment: Pick<RequestMap[Route.DepartmentCreate], 'requestData'> & Pick<RequestMap[Route.DepartmentEdit], 'requestData' | 'departmentId'> & Pick<RequestMap[Route.DepartmentDelete], 'departmentId'>;
  validationError: { name: string };
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export type DepartmentListProps = {
  departmentList: InitialState['departmentList'];
  isLoading: boolean;
  handleOnClick: HandleOnClick;
};

export interface DepartmentFormProps extends DepartmentProps {
  state: InitialState;
  isLoading: boolean;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}


export const PRODUCT = 'product'

/////// FUNCTION

export const callApi = async (selectedDepartment: InitialState['selectedDepartment']): Promise<MakeProductsRequestReturn> => {
  const { departmentId, requestData } = selectedDepartment;
  if (departmentId.length === 0 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.DepartmentCreate).withOptions({ requestData });
    return response; // Devolver el resultado de la llamada API
  }
  if (departmentId.length > 6 && requestData.name.length > 0) {
    const response = await makeProductsRequest(Route.DepartmentEdit).withOptions(selectedDepartment);
    return response; // Devolver el resultado de la llamada API
  }
  if (departmentId.length > 6 && requestData.name.length === 0) {
    const response = await makeProductsRequest(Route.DepartmentDelete).withOptions({ departmentId })
    return response;
  }
  // En otros casos, puedes devolver un valor por defecto o lanzar un error si es necesario.
  return { message: "error personal department", products: [] };
}
