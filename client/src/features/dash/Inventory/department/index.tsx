import React, { useContext, useEffect, useState } from 'react';
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
  Add = 'add'
}

export interface SelectedDepartment {
  _id: string;
  name: string;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void
export const initialState: SelectedDepartment = {
  _id: '',
  name: ''
}

const Departments: React.FC = () => {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const products = useAppSelector(selectProductsData);
  const [departmentList, setDepartmentList] = useState<IProductRedux.InitialState["products"]>(null);
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
        const updatedList = departmentList?.filter(dept => dept._id !== value) || [];
        const editedDepartment = departmentList?.find(dept => dept._id === value);

        if (editedDepartment) {
          let { _id, name } = editedDepartment;
          setSelectedDepartment({ _id, name });
          setDepartmentList(updatedList);
        }
        break;

      case ButtonName.Delete:
        emptyDepartment();
        setShowDeleteModal(true);
        break;

      case ButtonName.Clean:
        // Lógica para limpiar
        setSelectedDepartment(initialState);
        if (products) setDepartmentList(products);
        break;

      case ButtonName.Save:
        // Lógica para guardar o actualizar
        break;
      case ButtonName.Add:
        emptyDepartment();
        break;
      default:
        break;
    }
  };

  const emptyDepartment = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'empty', value: "" } })
  }

  const handleDeleteConfirm = () => {
    // Lógica para eliminar
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div>
        <DepartmentList departmentList={departmentList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <DepartmentForm selectedDepartment={selectedDepartment} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de eliminar este departamento?</p>
            <button onClick={handleDeleteConfirm}>Confirmar</button>
            <button onClick={handleDeleteCancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
