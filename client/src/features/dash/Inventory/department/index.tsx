import React, { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProductRedux } from '../../../../interfaces/product.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';
// import './Departments.scss'; // Importa tu archivo Sass aquí



export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel'
}

export interface SelectedDepartment { _id: string; name: string; }
export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void
export const initialState: SelectedDepartment = { _id: '', name: '' }

const Departments: React.FC = () => {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const products: IProductRedux.ProductPostsReturn = useAppSelector(selectProductsData);
  const [departmentList, setDepartmentList] = useState<IProductRedux.InitialState["products"]>({ message: "", products: [] });
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    const { name, value } = targetButton;

    switch (name) {
      case ButtonName.Edit:
        emptyDepartment();
        const updatedList = departmentList.products?.filter(dept => dept._id !== value) || [];
        const editedDepartment = departmentList.products?.find(dept => dept._id === value);
        if (editedDepartment) {
          let { _id, name } = editedDepartment;
          setSelectedDepartment({ _id, name });
          setDepartmentList({ ...departmentList, products: updatedList });
        }
        break;

      case ButtonName.Delete:
        emptyDepartment();
        setShowDeleteModal(true);
        break;

      case ButtonName.Clean:
        setSelectedDepartment(initialState);
        if (products) setDepartmentList(products);
        break;

      case ButtonName.Save:
        break;

      case ButtonName.Add:
        emptyDepartment();
        break;

      case ButtonName.Confirm:
        setShowDeleteModal(false);
        break;

      case ButtonName.Cancel:
        setShowDeleteModal(false);
        break;

      default:
        break;
    }
  };

  const emptyDepartment = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'empty', value: "" } })
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
