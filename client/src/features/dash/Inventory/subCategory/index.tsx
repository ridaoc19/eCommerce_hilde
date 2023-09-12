import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import SubcategoryForm from './SubcategoryForm';
import SubcategoryList from './SubcategoryList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, SubcategoryProps, callApiSubcategory } from './interface.subcategory';
import { Route, makeImagesRequest } from '../../../../services/imagesApi';

export const initialState: InitialState = {
  subcategoryList: [],
  selectedSubcategory: { categoryId: '', subcategoryId: '', requestData: { name: "" } },
  showDeleteModal: false
}

const Subcategory = ({ subcategory }: SubcategoryProps) => {
  const { dashboard: { state: { inventory: { department_id, category_id } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiSubcategory, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState(initialState);
  const { selectedSubcategory, subcategoryList, showDeleteModal } = state;

  useEffect(() => {
    if (subcategory) setState(prevState => ({ ...prevState, subcategoryList: subcategory }));
  }, [subcategory, department_id, category_id]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, selectedSubcategory: { ...prevState.selectedSubcategory, requestData: { ...prevState.selectedSubcategory.requestData, [name]: value } } }));

  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptySubcategory();
        const updatedList = subcategory.filter(subcat => subcat._id !== targetButton.value) || [];
        const editedSubcategory = subcategory.find(subcat => subcat._id === targetButton.value);
        if (editedSubcategory) {
          let { _id, name } = editedSubcategory;
          setState(prevState => ({
            ...prevState,
            selectedSubcategory: { ...prevState.selectedSubcategory, subcategoryId: _id, requestData: { name } },
            subcategoryList: updatedList
          }));
        }
        return;

      case ButtonName.Delete:
        emptySubcategory();
        setState(prevState => ({ ...prevState, selectedSubcategory: { ...prevState.selectedSubcategory, subcategoryId: targetButton.value }, showDeleteModal: true }));
        return;

      case ButtonName.Clean:
        if (subcategory) setState(prevState => ({ ...prevState, subcategoryList: subcategory }));
        break;

      case ButtonName.Save:
        if (selectedSubcategory.subcategoryId.length > 0) {
          await mutation.mutateAsync({ selectedSubcategory, state: 'edit' })
        } else if (category_id) {
          await mutation.mutateAsync({ selectedSubcategory: { ...selectedSubcategory, categoryId: category_id }, state: 'create' })
        }
        break;

      case ButtonName.Confirm:
        const filterImages = subcategory.find(pro => pro._id === selectedSubcategory.subcategoryId)?.productsId.flatMap(pro => pro.images)
        if (filterImages && filterImages?.length > 0) {
          const form = new FormData();
          filterImages.forEach((url, index) => form.append(`url[${index}]`, url));
          await makeImagesRequest(Route.ImagesDelete).withOptions({ requestData: form })
        }
        await mutation.mutateAsync({ selectedSubcategory, state: 'delete' });
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    emptySubcategory();
    setState(prevState => ({ ...prevState, showDeleteModal: false, selectedSubcategory: initialState.selectedSubcategory }));

  };

  const emptySubcategory = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'subcategoryEmpty_id', value: "" } })
  }

  return (
    <div>
      <div>
        <SubcategoryList subcategoryList={subcategoryList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <SubcategoryForm selectedSubcategory={selectedSubcategory} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
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

export default Subcategory;
