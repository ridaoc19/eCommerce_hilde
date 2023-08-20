import React, { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProduct, IProductRedux } from '../../../../interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import SubcategoryList from './SubcategoryList';
import SubcategoryForm from './SubcategoryForm';
import { SubcategoryCallProps, subcategoryCall } from '../../../../redux/reducers/product/actions';

export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel'
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void
export type SelectedSubcategory = Pick<SubcategoryCallProps, '_id' | 'name'>
export const initialState: SelectedSubcategory = { _id: "", name: '' }

const Subcategory: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const { products }: IProductRedux.ProductPostsReturn = useAppSelector(selectProductsData);
  const { dashboard: { state: { inventory: { department, category, subcategory } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const [subcategoryList, setSubcategoryList] = useState<IProduct.Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SelectedSubcategory>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { _id, name } = selectedSubcategory;

  useEffect(() => {
    let subcategory = products.find(dep => dep._id === department)?.categoriesId.find(cat => cat._id === category)?.subcategoriesId
    if (subcategory) setSubcategoryList(subcategory);
  }, [products, department, category, subcategory]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedSubcategory({ ...selectedSubcategory, [name]: value })
  }

  const handleOnClick: HandleOnClick = (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptySubcategory();
        const updatedList = subcategoryList?.filter(sub => sub._id !== targetButton.value) || [];
        const editedSubcategory = subcategoryList?.find(sub => sub._id === targetButton.value);
        if (editedSubcategory) {
          let { _id, name } = editedSubcategory;
          setSelectedSubcategory({ _id, name });
          setSubcategoryList(updatedList);
        }
        return;

      case ButtonName.Delete:
        emptySubcategory();
        setSelectedSubcategory({ ...selectedSubcategory, _id: targetButton.value });
        setShowDeleteModal(true);
        return;

      case ButtonName.Clean:
        let subcategory = products.find(dep => dep._id === department)?.categoriesId.find(cat => cat._id === category)?.subcategoriesId
        if (subcategory) setSubcategoryList(subcategory);
        break;

      case ButtonName.Save:
        if (selectedSubcategory._id.length === 0 && category) dispatchRedux(subcategoryCall({ route: 'create', method: 'post', _id: category, name }))
        if (selectedSubcategory._id.length > 6) dispatchRedux(subcategoryCall({ route: 'edit', method: 'put', _id, name }))
        break;

      case ButtonName.Confirm:
        dispatchRedux(subcategoryCall({ route: 'delete', method: 'delete', _id, name }))
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    emptySubcategory();
    setShowDeleteModal(false);
    setSelectedSubcategory(initialState);
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
