import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import useValidations from '../../../../hooks/useValidations';
import { IProduct } from '../../../../interfaces/product.interface';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';
import { ButtonName, DepartmentProps, HandleOnChange, HandleOnClick, InitialState, callApi } from './interface.department';
import useFunctionsDepartment from './useDepartmentFunctions';

export const initialState: InitialState = {
  departmentList: [],
  selectedDepartment: { departmentId: "", requestData: { name: "" } },
  validationError: { name: "" },
  showDeleteModal: false
}

const Departments = ({ department }: DepartmentProps) => {
  const { getValidationErrors } = useValidations();

  const { collectFunctions, emptyDepartment } = useFunctionsDepartment({ initialState });
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(callApi, { onSuccess: () => { queryClient.invalidateQueries(IProduct.PRODUCT_NAME_QUERY) } });

  const [state, setState] = useState<InitialState>(initialState);
  const { selectedDepartment, showDeleteModal, departmentList } = state;

  useEffect(() => {
    if (department) setState(prevState => ({ ...prevState, departmentList: department || [] }));
    // eslint-disable-next-line
  }, [department]);

  const handleOnChange: HandleOnChange = (event) => {
    const responseError = getValidationErrors({ fieldName: event.target.name, value: event.target.value })
    setState(collectFunctions.updateChangeDepartment({ state, event, responseError }))
  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;
    const responseError = getValidationErrors({ fieldName: 'name', value: selectedDepartment.requestData.name })

    switch (targetButton.name) {
      case ButtonName.Edit:
        setState(collectFunctions.updateClickEdit({ department, state, value: targetButton.value }))
        return;

      case ButtonName.Delete:
        setState(collectFunctions.updateClickDelete({ department, state, value: targetButton.value }))
        return;

      case ButtonName.Clean:
        if (department) setState(prevState => ({ ...prevState, departmentList: department || [] }));
        break;

      case ButtonName.Save:
        if (responseError.error) return setState(prevState => ({ ...prevState, validationError: { name: responseError.error } }))
        await mutateAsync(selectedDepartment);
        setState(prevState => ({ ...prevState, selectedDepartment: initialState.selectedDepartment }))
        return;

      case ButtonName.Confirm:
        setState(prevState => ({ ...prevState, showDeleteModal: false }));
        collectFunctions.updateClickConfirm({ department, state })
        await mutateAsync(selectedDepartment);
        break;

      // case ButtonName.Add:
      //   break;

      // case ButtonName.Cancel:
      //   break;

      default:
        break;
    }
    setState(emptyDepartment({ department, state }));
  };

  return (
    <div>
      <div>
        <DepartmentList departmentList={departmentList} isLoading={isLoading} handleOnClick={handleOnClick} />
      </div>
      <div>
        <DepartmentForm department={department} state={state} isLoading={isLoading} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {showDeleteModal &&
        <ModalConfirm
          message={`¿Estás seguro de eliminar '${department.find(nam => nam._id === selectedDepartment.departmentId)?.name}'?`}
          handleOnClick={handleOnClick}
          Confirm={ButtonName.Confirm}
          Cancel={ButtonName.Cancel} />}
    </div>
  );
};

export default Departments;