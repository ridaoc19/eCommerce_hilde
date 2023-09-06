import React from 'react';
import { IProduct } from "../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, Route, makeProductsRequest } from '../../../../services/productApi';


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
  selectedDepartment: { departmentId: string; requestData: { name: string } };
  showDeleteModal: boolean;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void

export type DepartmentListProps = {
  departmentList: InitialState['departmentList'];
  handleOnClick: HandleOnClick;
};

export interface DepartmentFormProps {
  selectedDepartment: InitialState['selectedDepartment']
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
