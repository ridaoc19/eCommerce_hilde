import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import useValidations from '../../../../hooks/useValidations';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProduct } from '../../../../interfaces/product.interface';
import SubcategoryForm from './SubcategoryForm';
import SubcategoryList from './SubcategoryList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, SubcategoryProps, callApiSubcategory } from './interface.subcategory';
import useSubcategoryFunctions from './useSubcategoryFunctions';

export const initialState: InitialState = {
  subcategoryList: [],
  selectedSubcategory: { categoryId: '', subcategoryId: '', requestData: { name: "" } },
  validationError: { name: "" },
  showDeleteModal: false
}

const Subcategory = ({ subcategory }: SubcategoryProps) => {
  const { collectFunctions, emptySubcategory } = useSubcategoryFunctions({ initialState })
  const { getValidationErrors } = useValidations();

  const { dashboard: { state: { inventory: { department_id, category_id } } } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(callApiSubcategory, { onSuccess: () => { queryClient.invalidateQueries(IProduct.PRODUCT_NAME_QUERY) } });
  const [state, setState] = useState(initialState);
  const { selectedSubcategory, subcategoryList, showDeleteModal } = state;

  useEffect(() => {
    if (subcategory) setState(prevState => ({ ...prevState, subcategoryList: subcategory }));
  }, [subcategory, department_id, category_id]);

  const handleOnChange: HandleOnChange = (event) => {
    // const { name, value } = event.target;
    // setState(prevState => ({ ...prevState, selectedSubcategory: { ...prevState.selectedSubcategory, requestData: { ...prevState.selectedSubcategory.requestData, [name]: value } } }));
    const responseError = getValidationErrors({ fieldName: event.target.name, value: event.target.value })
    setState(collectFunctions.updateChangeSubcategory({ state, event, responseError }))
  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;
    const responseError = getValidationErrors({ fieldName: 'name', value: selectedSubcategory.requestData.name })


    switch (targetButton.name) {
      case ButtonName.Edit:
        // emptySubcategory();
        // const updatedList = subcategory.filter(subcat => subcat._id !== targetButton.value) || [];
        // const editedSubcategory = subcategory.find(subcat => subcat._id === targetButton.value);
        // if (editedSubcategory) {
        //   let { _id, name } = editedSubcategory;
        //   setState(prevState => ({
        //     ...prevState,
        //     selectedSubcategory: { ...prevState.selectedSubcategory, subcategoryId: _id, requestData: { name } },
        //     subcategoryList: updatedList
        //   }));
        // }
        setState(collectFunctions.updateClickEdit({ subcategory, state, value: targetButton.value }))
        return;

      case ButtonName.Delete:
        // emptySubcategory();
        // setState(prevState => ({ ...prevState, selectedSubcategory: { ...prevState.selectedSubcategory, subcategoryId: targetButton.value }, showDeleteModal: true }));
        setState(collectFunctions.updateClickDelete({ subcategory, state, value: targetButton.value }))
        return;

      case ButtonName.Clean:
        if (subcategory) setState(prevState => ({ ...prevState, subcategoryList: subcategory }));
        break;

      case ButtonName.Save:
        if (responseError.error) return setState(prevState => ({ ...prevState, validationError: { name: responseError.error } }))
        category_id && await mutateAsync({ ...selectedSubcategory, categoryId: category_id });
        setState(prevState => ({ ...prevState, selectedSubcategory: initialState.selectedSubcategory }))
        // if (selectedSubcategory.subcategoryId.length > 0) {
        //   await mutation.mutateAsync({ selectedSubcategory, state: 'edit' })
        // } else if (category_id) {
        //   await mutation.mutateAsync({ selectedSubcategory: { ...selectedSubcategory, categoryId: category_id }, state: 'create' })
        // }
        break;

      case ButtonName.Confirm:
        // if (filterImages && filterImages?.length > 0) {
        //   const form = new FormData();
        //   filterImages.forEach((url, index) => form.append(`url[${index}]`, url));
        //   await makeImagesRequest(Route.ImagesDelete).withOptions({ requestData: form })
        // }
        // await mutation.mutateAsync({ selectedSubcategory, state: 'delete' });
        setState(prevState => ({ ...prevState, showDeleteModal: false }));
        collectFunctions.updateClickConfirm({ subcategory, state })
        await mutateAsync(selectedSubcategory);
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    // emptySubcategory();
    setState(emptySubcategory({ subcategory, state }));

  };

  return (
    <div>
      <div>
        <SubcategoryList subcategoryList={subcategoryList} isLoading={isLoading} handleOnClick={handleOnClick} />
      </div>
      <div>
        <SubcategoryForm state={state} isLoading={isLoading} subcategory={subcategory} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {showDeleteModal &&
        <ModalConfirm
        message={`¿Estás seguro de eliminar '${subcategory.find(nam => nam._id === selectedSubcategory.subcategoryId)?.name}'?`}
          handleOnClick={handleOnClick}
          Confirm={ButtonName.Confirm}
          Cancel={ButtonName.Cancel} />}
    </div>
  );
};

export default Subcategory;
