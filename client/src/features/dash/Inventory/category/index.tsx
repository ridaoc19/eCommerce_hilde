import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import useValidations from '../../../../hooks/useValidations';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProduct } from '../../../../interfaces/product.interface';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { ButtonName, CategoryProps, HandleOnChange, HandleOnClick, InitialState, callApiCategory } from './interface.category';
import useCategoryFunctions from './useCategoryFunctions';

export const initialState: InitialState = {
  categoryList: [],
  selectedCategory: { categoryId: '', departmentId: '', requestData: { name: "" } },
  validationError: { name: "" },
  showDeleteModal: false
}

const Category = ({ category }: CategoryProps) => {
  const { collectFunctions, emptyCategory } = useCategoryFunctions({ initialState })
  const { getValidationErrors } = useValidations();


  const { dashboard: { state: { inventory: { department_id } } } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(callApiCategory, { onSuccess: () => { queryClient.invalidateQueries(IProduct.PRODUCT_NAME_QUERY) } });
  const [state, setState] = useState(initialState);
  const { selectedCategory, categoryList, showDeleteModal } = state;


  useEffect(() => {
    if (category) setState(prevState => ({ ...prevState, categoryList: category }));
  }, [category, department_id]);

  const handleOnChange: HandleOnChange = (event) => {
    const responseError = getValidationErrors({ fieldName: event.target.name, value: event.target.value })
    setState(collectFunctions.updateChangeCategory({ state, event, responseError }))
  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;
    const responseError = getValidationErrors({ fieldName: 'name', value: selectedCategory.requestData.name })


    switch (targetButton.name) {
      case ButtonName.Edit:
        setState(collectFunctions.updateClickEdit({ category, state, value: targetButton.value }))
        return;

      case ButtonName.Delete:
        setState(collectFunctions.updateClickDelete({ category, state, value: targetButton.value }))
        return;

      case ButtonName.Clean:
        if (category) setState(prevState => ({ ...prevState, categoryList: category }));
        break;

      case ButtonName.Save:
        if (responseError.error) return setState(prevState => ({ ...prevState, validationError: { name: responseError.error } }))
        department_id && await mutateAsync({ ...selectedCategory, departmentId: department_id });
        setState(prevState => ({ ...prevState, selectedCategory: initialState.selectedCategory }))
        return;

      case ButtonName.Confirm:
        setState(prevState => ({ ...prevState, showDeleteModal: false }));
        collectFunctions.updateClickConfirm({ category, state })
        await mutateAsync(selectedCategory);
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    setState(emptyCategory({ category, state }))
  };


  return (
    <div>
      <div>
        <CategoryList categoryList={categoryList} isLoading={isLoading} handleOnClick={handleOnClick} />
      </div>
      <div>
        <CategoryForm category={category} isLoading={isLoading} state={state} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
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

export default Category;
