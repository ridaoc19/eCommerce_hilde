import React, { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProduct, IProductRedux } from '../../../../interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import { ProductsCallProps, productsCall } from '../../../../redux/reducers/product/actions';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';

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
export type SelectedProducts = Pick<ProductsCallProps, '_id' | 'name'>
export const initialState: SelectedProducts = { _id: "", name: '' }

const Products: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const { products }: IProductRedux.ProductPostsReturn = useAppSelector(selectProductsData);
  const { dashboard: { state: { inventory: { department, category, subcategory } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const [productsList, setProductsList] = useState<IProduct.Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { _id, name } = selectedProducts;

  useEffect(() => {
    let product = products.find(dep => dep._id === department)?.categoriesId.find(cat => cat._id === category)?.subcategoriesId.find(sub => sub._id === subcategory)?.productsId
    if (product) setProductsList(product);
  }, [products, department, category, subcategory]);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedProducts({ ...selectedProducts, [name]: value })
  }

  const handleOnClick: HandleOnClick = (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptyProducts();
        const updatedList = productsList?.filter(prod => prod._id !== targetButton.value) || [];
        const editedProducts = productsList?.find(prod => prod._id === targetButton.value);
        if (editedProducts) {
          let { _id, name } = editedProducts;
          setSelectedProducts({ _id, name });
          setProductsList(updatedList);
        }
        return;

      case ButtonName.Delete:
        emptyProducts();
        setSelectedProducts({ ...selectedProducts, _id: targetButton.value });
        setShowDeleteModal(true);
        return;

      case ButtonName.Clean:
        let product = products.find(dep => dep._id === department)?.categoriesId.find(cat => cat._id === category)?.subcategoriesId.find(sub => sub._id === subcategory)?.productsId
        if (product) setProductsList(product);
        break;

      case ButtonName.Save:
        if (selectedProducts._id.length === 0 && category) dispatchRedux(productsCall({ route: 'create', method: 'post', _id: category, name }))
        if (selectedProducts._id.length > 6) dispatchRedux(productsCall({ route: 'edit', method: 'put', _id, name }))
        break;

      case ButtonName.Confirm:
        dispatchRedux(productsCall({ route: 'delete', method: 'delete', _id, name }))
        break;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    emptyProducts();
    setShowDeleteModal(false);
    setSelectedProducts(initialState);
  };

  const emptyProducts = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'productsEmpty', value: "" } })
  }

  return (
    <div>
      <div>
        <ProductsList productsList={productsList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <ProductsForm selectedProducts={selectedProducts} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {showDeleteModal &&
        <ModalConfirm
          message='¿Estás seguro de eliminar este producto?'
          handleOnClick={handleOnClick}
          Confirm={ButtonName.Confirm}
          Cancel={ButtonName.Cancel} />}
    </div>
  );
};

export default Products;
