import { useContext } from 'react';
import { CreateContext } from "../../../../../hooks/useContext";
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import { ResponseError } from "../../../../../hooks/useValidations";
import { IContext } from "../../../../../interfaces/hooks/context.interface";
import { imagesAdmin } from '../../../../../services/imagesApi';
import { DepartmentProps, InitialState } from "./interface.department";

function useDepartmentFunctions({ initialState }: { initialState: InitialState }) {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;

  type UpdateChangeDepartment = { state: InitialState, responseError: ResponseError, event: React.ChangeEvent<HTMLInputElement>, }

  interface StateDepartment extends DepartmentProps {
    state: InitialState;
  }

  function emptyDepartment({ department, state }: StateDepartment) {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'departmentEmpty_id', value: "" } })
    return {
      ...state,
      validationError: initialState.validationError,
      showDeleteModal: false,
      selectedDepartment: initialState.selectedDepartment,
      departmentList: department
    };
  }

  const collectFunctions = {
    updateChangeDepartment({ state, responseError: { error, stop }, event, }: UpdateChangeDepartment) {
      const { name, value } = event.target;
      return {
        ...state,
        selectedDepartment: stop
          ? { ...state.selectedDepartment }
          : { ...state.selectedDepartment, requestData: { ...state.selectedDepartment.requestData, [name]: value } },
        validationError: { name: error },
      };
    },

    updateClickDelete({ department, state, value }: StateDepartment & { value: string }) {
      emptyDepartment({ department, state });
      const updatedList = department.filter(dept => dept._id !== value)
      return {
        ...state,
        selectedDepartment: { ...state.selectedDepartment, departmentId: value },
        showDeleteModal: true,
        departmentList: updatedList
      };
    },

    updateClickEdit({ department, state, value }: StateDepartment & { value: string }) {
      emptyDepartment({ department, state });
      const updatedList = department.filter(dept => dept._id !== value) || [];
      const editedDepartment = department.find(dept => dept._id === value);
      if (editedDepartment) {
        const { _id, name } = editedDepartment;
        return {
          ...state,
          selectedDepartment: { ...state.selectedDepartment, departmentId: _id, requestData: { name } },
          departmentList: updatedList
        };
      }
      return state
    },

    updateClickConfirm({ department, state }: StateDepartment) {
      const filterImages = department.find(pro => pro._id === state.selectedDepartment.departmentId)
        ?.categoriesId.flatMap(pro => pro.subcategoriesId)
        .flatMap(pro => pro.productsId).flatMap(img => img.images) || []
      filterImages.length > 0 && imagesAdmin({ toDelete: filterImages })
    }

  }

  return { collectFunctions, emptyDepartment };
}

export default useDepartmentFunctions;