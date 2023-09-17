import { useContext } from "react";
import { CategoryProps, InitialState } from "./interface.category";
import { CreateContext } from "../../../../hooks/useContext";
import { IContext } from "../../../../interfaces/hooks/context.interface";
import { ResponseError } from "../../../../hooks/useValidations";
import { ActionTypeDashboard } from "../../../../hooks/useContext/dash/reducer";
import { imagesAdmin } from "../../../../services/imagesApi";


type UpdateChangeCategory = { state: InitialState, responseError: ResponseError, event: React.ChangeEvent<HTMLInputElement>, }

interface StateCategory extends CategoryProps {
  state: InitialState;
}

function useCategoryFunctions({ initialState }: { initialState: InitialState }) {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;

  function emptyCategory({ category, state }: StateCategory) {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'categoryEmpty_id', value: "" } })
    return {
      ...state,
      validationError: initialState.validationError,
      showDeleteModal: false,
      selectedCategory: initialState.selectedCategory,
      categoryList: category
    };
  }

  const collectFunctions = {
    updateChangeCategory({ state, responseError: { error, stop }, event, }: UpdateChangeCategory) {
      const { name, value } = event.target;
      return {
        ...state,
        selectedCategory: stop
          ? { ...state.selectedCategory }
          : { ...state.selectedCategory, requestData: { ...state.selectedCategory.requestData, [name]: value } },
        validationError: { name: error },
      };
    },

    updateClickEdit({ category, state, value }: StateCategory & { value: string }) {
      emptyCategory({ category, state });
      const updatedList = category.filter(cat => cat._id !== value) || [];
      const editedCategory = category.find(cat => cat._id === value);
      if (editedCategory) {
        const { _id, name } = editedCategory;
        return {
          ...state,
          selectedCategory: { ...state.selectedCategory, categoryId: _id, requestData: { name } },
          categoryList: updatedList
        };
      }
      return state
    },


    updateClickDelete({ category, state, value }: StateCategory & { value: string }) {
      emptyCategory({ category, state });
      const updatedList = category.filter(cat => cat._id !== value)
      return {
        ...state,
        selectedCategory: { ...state.selectedCategory, categoryId: value },
        showDeleteModal: true,
        departmentList: updatedList
      };
    },

    updateClickConfirm({ category, state }: StateCategory) {
      const filterImages = category.find(pro => pro._id === state.selectedCategory.categoryId)?.subcategoriesId
        .flatMap(pro => pro.productsId).flatMap(img => img.images) || []
      filterImages.length > 0 && imagesAdmin({ toDelete: filterImages })
    }

  }

  return { collectFunctions, emptyCategory };
}

export default useCategoryFunctions;