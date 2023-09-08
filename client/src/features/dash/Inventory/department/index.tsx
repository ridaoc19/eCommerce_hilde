import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';
import { ButtonName, DepartmentProps, HandleOnChange, HandleOnClick, InitialState, callApi } from './interface.department';


export const initialState: InitialState = {
  departmentList: [],
  selectedDepartment: { departmentId: "", requestData: { name: "" } },
  showDeleteModal: false
}

const Departments = ({ department }: DepartmentProps) => {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const queryClient = useQueryClient();
  const mutation = useMutation(callApi, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState(initialState);
  const { selectedDepartment, showDeleteModal, departmentList } = state;

  useEffect(() => {
    if (department) setState(prevState => ({ ...prevState, departmentList: department || [] }));
    // eslint-disable-next-line
  }, [department]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, selectedDepartment: { ...prevState.selectedDepartment, requestData: { ...prevState.selectedDepartment.requestData, [name]: value } } }));
  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptyDepartment();
        const updatedList = departmentList.filter(dept => dept._id !== targetButton.value) || [];
        const editedDepartment = departmentList.find(dept => dept._id === targetButton.value);
        if (editedDepartment) {
          const { _id, name } = editedDepartment;
          setState(prevState => ({ ...prevState, selectedDepartment: { ...prevState.selectedDepartment, departmentId: _id, requestData: { name } }, departmentList: updatedList }));
        }
        return;

      case ButtonName.Delete:
        emptyDepartment();
        setState(prevState => ({ ...prevState, selectedDepartment: { ...prevState.selectedDepartment, departmentId: targetButton.value }, showDeleteModal: true }));
        return;

      case ButtonName.Clean:
        if (department) setState(prevState => ({ ...prevState, departmentList: department || [] }));
        break;

      case ButtonName.Save:
        await mutation.mutateAsync(selectedDepartment);
        break;

      case ButtonName.Confirm:
        await mutation.mutateAsync(selectedDepartment);
        break;

      // case ButtonName.Add:
      //   break;

      // case ButtonName.Cancel:
      //   break;

      default:
        break;
    }
    emptyDepartment();
    setState(prevState => ({ ...prevState, showDeleteModal: false, selectedDepartment: initialState.selectedDepartment }));
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