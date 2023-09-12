import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { ButtonName, CategoryProps, HandleOnChange, HandleOnClick, InitialState, callApiCategory } from './interface.category';
import { Route, makeImagesRequest } from '../../../../services/imagesApi';

export const initialState: InitialState = {
  categoryList: [],
  selectedCategory: { categoryId: '', departmentId: '', requestData: { name: "" } },
  showDeleteModal: false
}

const Category = ({ category }: CategoryProps) => {

  const { dashboard: { state: { inventory: { department_id } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiCategory, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState(initialState);
  const { selectedCategory, categoryList, showDeleteModal } = state;


  useEffect(() => {
    if (category) setState(prevState => ({ ...prevState, categoryList: category }));
  }, [category, department_id]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, selectedCategory: { ...prevState.selectedCategory, requestData: { ...prevState.selectedCategory.requestData, [name]: value } } }));

  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptyCategory();
        const updatedList = category.filter(cat => cat._id !== targetButton.value) || [];
        const editedCategory = category.find(cat => cat._id === targetButton.value);
        if (editedCategory) {
          let { _id, name } = editedCategory;
          setState(prevState => ({ ...prevState, selectedCategory: { ...prevState.selectedCategory, categoryId: _id, requestData: { name } }, categoryList: updatedList }));
        }
        return;

      case ButtonName.Delete:
        emptyCategory();
        setState(prevState => ({ ...prevState, selectedCategory: { ...prevState.selectedCategory, categoryId: targetButton.value }, showDeleteModal: true }));
        return;

      case ButtonName.Clean:
        if (category) setState(prevState => ({ ...prevState, categoryList: category }));
        break;

      case ButtonName.Save:
        if ('categoryId' in selectedCategory && selectedCategory.categoryId.length > 0) {
          await mutation.mutateAsync({ selectedCategory, state: 'edit' })
        } else if (department_id) {
          await mutation.mutateAsync({ selectedCategory: { ...selectedCategory, departmentId: department_id }, state: 'create' })
        }
        break;

      case ButtonName.Confirm:
        const filterImages = category.find(pro => pro._id === selectedCategory.categoryId)?.subcategoriesId
          .flatMap(pro => pro.productsId).flatMap(img => img.images)
        if (filterImages && filterImages?.length > 0) {
          const form = new FormData();
          filterImages.forEach((url, index) => form.append(`url[${index}]`, url));
          await makeImagesRequest(Route.ImagesDelete).withOptions({ requestData: form })
        }
        await mutation.mutateAsync({ selectedCategory, state: 'delete' });
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    emptyCategory();
    setState(prevState => ({ ...prevState, showDeleteModal: false, selectedCategory: initialState.selectedCategory }));

  };

  const emptyCategory = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'categoryEmpty_id', value: "" } })
  }

  return (
    <div>
      <div>
        <CategoryList categoryList={categoryList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <CategoryForm selectedCategory={selectedCategory} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
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
