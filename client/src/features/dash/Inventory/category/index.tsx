import React, { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProduct, IProductRedux } from '../../../../interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { CategoryCallProps, categoryCall } from '../../../../redux/reducers/product/actions';


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
export type SelectedCategory = Pick<CategoryCallProps, '_id' | 'name'>
export const initialState: SelectedCategory = { _id: "", name: '' }

const Category: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const { products }: IProductRedux.ProductPostsReturn = useAppSelector(selectProductsData);
  const { dashboard: { state: { inventory: { department } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const [categoryList, setCategoryList] = useState<IProduct.Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { _id, name } = selectedCategory;

  useEffect(() => {
    let category = products.find(dep => dep._id === department)?.categoriesId
    if (category) setCategoryList(category);
  }, [products, department]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedCategory({ ...selectedCategory, [name]: value })
  }

  const handleOnClick: HandleOnClick = (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptyCategory();
        const updatedList = categoryList?.filter(cat => cat._id !== targetButton.value) || [];
        const editedCategory = categoryList?.find(cat => cat._id === targetButton.value);
        if (editedCategory) {
          let { _id, name } = editedCategory;
          setSelectedCategory({ _id, name });
          setCategoryList(updatedList);
        }
        return;

      case ButtonName.Delete:
        emptyCategory();
        setSelectedCategory({ ...selectedCategory, _id: targetButton.value });
        setShowDeleteModal(true);
        return;

      case ButtonName.Clean:
        let category = products.find(dep => dep._id === department)?.categoriesId
        if (category) setCategoryList(category);
        break;

      case ButtonName.Save:
        if (selectedCategory._id.length === 0 && department) dispatchRedux(categoryCall({ route: 'create', method: 'post', _id: department, name }))
        if (selectedCategory._id.length > 6) dispatchRedux(categoryCall({ route: 'edit', method: 'put', _id, name }))
        break;

      case ButtonName.Confirm:
        dispatchRedux(categoryCall({ route: 'delete', method: 'delete', _id, name }))
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    emptyCategory();
    setShowDeleteModal(false);
    setSelectedCategory(initialState);
  };

  const emptyCategory = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'categoryEmpty', value: "" } })
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
