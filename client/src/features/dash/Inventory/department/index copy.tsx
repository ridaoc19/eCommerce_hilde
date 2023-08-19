import React, { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProductRedux } from '../../../../interfaces/product.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
// import './Departments.scss'; // Importa tu archivo Sass aquí

enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add'
}

interface Department {
  _id: string;
  name: string;
}

const initialState: Department = {
  _id: '',
  name: ''
}

const Departments: React.FC = () => {
  const { dashboard: { state: { inventory: { department } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const products = useAppSelector(selectProductsData);
  const [departmentList, setDepartmentList] = useState<IProductRedux.InitialState["products"] | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (products) setDepartmentList(products);
  }, [products]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <h3>Departments:</h3>
        <ul>
          {departmentList?.map((dept, index) => (
            <li key={index}>
              <button name={ButtonName.Edit} value={dept._id} onClick={handleOnClick}>Edit</button>
              <button name={ButtonName.Delete} onClick={handleOnClick}>Delete</button>
              <span onClick={() => dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'department', value: dept._id } })}>
                {dept.name}
              </span>
            </li>
          ))}
        </ul>
        <button name={ButtonName.Add} onClick={handleOnClick}>Nuevo Departamento</button>
        {!department && (
          <>
            <div className='input'>
              <input
                type="text"
                placeholder="Ingresar un nuevo departamento"
                value={selectedDepartment.name}
                onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })}
              />
            </div>
            <div className="-button">
              <div>
                <button name={ButtonName.Clean} onClick={handleOnClick}>Limpiar</button>
                <button name={ButtonName.Save} onClick={handleOnClick}>{selectedDepartment._id ? 'Actualizar' : 'Crear'}</button>
              </div>
            </div>
          </>
        )}
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
