import React, { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProductRedux } from '../../../../interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import { DepartmentCallProps, departmentCall } from '../../../../redux/reducers/product/actions';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';

export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel'
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void
export type SelectedDepartment = Pick<DepartmentCallProps, '_id' | 'name'>
export const initialState: SelectedDepartment = { _id: "", name: '' }

const Departments: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const products: IProductRedux.ProductPostsReturn = useAppSelector(selectProductsData);
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const [departmentList, setDepartmentList] = useState<IProductRedux.InitialState["products"]>({ message: "", products: [] });
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { _id, name } = selectedDepartment;

  useEffect(() => {
    if (products) setDepartmentList(products);
  }, [products]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedDepartment({ ...selectedDepartment, [name]: value })
  }

  const handleOnClick: HandleOnClick = (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptyDepartment();
        const updatedList = departmentList.products?.filter(dept => dept._id !== targetButton.value) || [];
        const editedDepartment = departmentList.products?.find(dept => dept._id === targetButton.value);
        if (editedDepartment) {
          let { _id, name } = editedDepartment;
          setSelectedDepartment({ _id, name });
          setDepartmentList({ ...departmentList, products: updatedList });
        }
        return;

      case ButtonName.Delete:
        emptyDepartment();
        setSelectedDepartment({ ...selectedDepartment, _id: targetButton.value });
        setShowDeleteModal(true);
        return;

      case ButtonName.Clean:
        if (products) setDepartmentList(products);
        break;

      case ButtonName.Save:
        if (selectedDepartment._id.length > 6) dispatchRedux(departmentCall({ route: 'edit', method: 'put', _id, name }))
        if (selectedDepartment._id.length === 0) dispatchRedux(departmentCall({ route: 'create', method: 'post', _id, name }))
        break;

      case ButtonName.Confirm:
        dispatchRedux(departmentCall({ route: 'delete', method: 'delete', _id, name }))
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    emptyDepartment();
    setShowDeleteModal(false);
    setSelectedDepartment(initialState);
  };

  const emptyDepartment = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'departmentEmpty', value: "" } })
  }

  return (
    <div>
      <div>
        <DepartmentList departmentList={departmentList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <DepartmentForm selectedDepartment={selectedDepartment} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {showDeleteModal &&
        <ModalConfirm
          message='¿Estás seguro de eliminar este departamento?'
          handleOnClick={handleOnClick}
          Confirm={ButtonName.Confirm}
          Cancel={ButtonName.Cancel} />}
    </div>
  );
};

export default Departments;
