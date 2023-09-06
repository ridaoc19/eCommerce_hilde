import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import SubcategoryForm from './SubcategoryForm';
import SubcategoryList from './SubcategoryList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, SubcategoryProps, callApiSubcategory } from './interface.subcategory';

export const initialState: InitialState = {
  subcategoryList: [],
  selectedSubcategory: { categoryId: '', subcategoryId: '', requestData: { name: "" } },
  showDeleteModal: false
}

const Subcategory = ({ subcategory }: SubcategoryProps) => {
  const { dashboard: { state: { inventory: { department, category } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiSubcategory, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState(initialState);
  const { selectedSubcategory, subcategoryList, showDeleteModal } = state;

  useEffect(() => {
    if (subcategory) setState(prevState => ({ ...prevState, subcategoryList: subcategory }));
  }, [subcategory, department, category]);

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
        const updatedList = subcategoryList?.filter(subcat => subcat._id !== targetButton.value) || [];
        const editedSubcategory = subcategoryList?.find(subcat => subcat._id === targetButton.value);
        if (editedSubcategory) {
          let { _id, name } = editedSubcategory;
          setState(prevState => ({ ...prevState, selectedSubcategory: { ...prevState.selectedSubcategory, subcategoryId: _id, requestData: { name } }, subcategoryList: updatedList }));
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
        } else if (category) {
          await mutation.mutateAsync({ selectedSubcategory: { ...selectedSubcategory, categoryId: category }, state: 'create' })
        }
        break;

      case ButtonName.Confirm:
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
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'subcategoryEmpty', value: "" } })
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
