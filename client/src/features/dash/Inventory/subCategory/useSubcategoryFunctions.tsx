import React, { useContext } from 'react';
import { InitialState, SubcategoryProps } from './interface.subcategory';
import { ResponseError } from '../../../../hooks/useValidations';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { imagesAdmin } from '../../../../services/imagesApi';

type UpdateChangeSubcategory = { state: InitialState, responseError: ResponseError, event: React.ChangeEvent<HTMLInputElement>, }

interface StateSubcategory extends SubcategoryProps {
  state: InitialState;
}

function useSubcategoryFunctions({ initialState }: { initialState: InitialState }) {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;

  function emptySubcategory({ subcategory, state }: StateSubcategory) {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'subcategoryEmpty_id', value: "" } })
    return {
      ...state,
      validationError: initialState.validationError,
      showDeleteModal: false,
      selectedSubcategory: initialState.selectedSubcategory,
      subcategoryList: subcategory
    };
  }

  const collectFunctions = {
    updateChangeSubcategory({ state, responseError: { error, stop }, event, }: UpdateChangeSubcategory) {
      const { name, value } = event.target;
      return {
        ...state,
        selectedSubcategory: stop
          ? { ...state.selectedSubcategory }
          : { ...state.selectedSubcategory, requestData: { ...state.selectedSubcategory.requestData, [name]: value } },
        validationError: { name: error },
      };
    },

    updateClickEdit({ subcategory, state, value }: StateSubcategory & { value: string }) {
      emptySubcategory({ subcategory, state });
      const updatedList = subcategory.filter(sub => sub._id !== value) || [];
      const editedCategory = subcategory.find(sub => sub._id === value);
      if (editedCategory) {
        const { _id, name } = editedCategory;
        return {
          ...state,
          selectedSubcategory: { ...state.selectedSubcategory, subcategoryId: _id, requestData: { name } },
          subcategoryList: updatedList
        };
      }
      return state
    },


    updateClickDelete({ subcategory, state, value }: StateSubcategory & { value: string }) {
      emptySubcategory({ subcategory, state });
      const updatedList = subcategory.filter(cat => cat._id !== value)
      return {
        ...state,
        selectedSubcategory: { ...state.selectedSubcategory, subcategoryId: value },
        showDeleteModal: true,
        subcategoryList: updatedList
      };
    },

    updateClickConfirm({ subcategory, state }: StateSubcategory) {
      const filterImages = subcategory.find(pro => pro._id === state.selectedSubcategory.subcategoryId)?.productsId.flatMap(pro => pro.images) || []
      filterImages.length > 0 && imagesAdmin({ toDelete: filterImages })
    }

  }

  return { collectFunctions, emptySubcategory };
}

export default useSubcategoryFunctions;