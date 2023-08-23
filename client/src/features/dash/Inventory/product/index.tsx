import React, { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IProduct, IProductRedux } from '../../../../interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectProductsData } from '../../../../redux/reducers/product';
import { ProductCall, productsCall } from '../../../../redux/reducers/product/actions';
import ProductDetail, { DataProductDetail } from './ProductDetail';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';

export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel',
  Product = 'product',
  AddSpecification = 'addSpecification'
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement>) => void
export type SelectedProducts = ProductCall;
export const initialState: SelectedProducts = { _id: '', name: '', price: '', description: '', images: [], specification: [], imgDelete: [] }

const Products: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const { products }: IProductRedux.ProductPostsReturn = useAppSelector(selectProductsData);
  const { dashboard: { state: { inventory: { department, category, subcategory, products: product } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const [productsList, setProductsList] = useState<IProduct.Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>(initialState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productDetail, setProductDetail] = useState<DataProductDetail>({ breadcrumb: ["", "", ""], product: { _id: "", name: "", description: "", images: [], price: "", specification: [], subcategoryId: "" } });


  useEffect(() => {
    let product = products.find(dep => dep._id === department)?.categoriesId.find(cat => cat._id === category)?.subcategoriesId.find(sub => sub._id === subcategory)?.productsId
    if (product) setProductsList(product);
  }, [products, department, category, subcategory]);

  const handleOnChange: HandleOnChange = (event) => {
    const inputName = event.target.name;

    if (inputName === 'images') {
      const files = event.target.files;
      if (files && files.length > 0) {
        setSelectedProducts((prevData) => ({ ...prevData, images: [...prevData.images, files[0]] }));
      }

    } else if (inputName === 'specificationKey' || inputName === 'specificationValue') {
      const specIndex = parseInt(event.target.dataset.index || '0', 10);
      const specField = inputName === 'specificationKey' ? 'key' : 'value';
      const updatedSpecification = [...selectedProducts.specification];
      updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: event.target.value };
      setSelectedProducts((prevData) => ({ ...prevData, specification: updatedSpecification }));

    } else {
      setSelectedProducts((prevData) => ({ ...prevData, [inputName]: event.target.value }));
    }

    // const { name, value } = event.target;
    // setSelectedProducts({ ...selectedProducts, [name]: value })
  }

  const handleOnClick: HandleOnClick = (event) => {
    event.preventDefault();
    let { _id, name, price, description, images, specification, imgDelete } = selectedProducts;
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {
      case ButtonName.Edit:
        emptyProducts();
        const updatedList = productsList?.filter(prod => prod._id !== targetButton.value) || [];
        const editedProducts = productsList?.find(prod => prod._id === targetButton.value);
        if (editedProducts) {
          // let { _id, name } = editedProducts;
          // setSelectedProducts({ _id, name });
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
        if (selectedProducts._id.length === 0 && subcategory)
          dispatchRedux(productsCall({ route: 'create', method: 'post', _id: subcategory, name, price, description, images, specification, imgDelete: [] }))
        if (selectedProducts._id.length > 6)
          dispatchRedux(productsCall({ route: 'edit', method: 'put', _id, name, price, description, images, specification, imgDelete }))
        return;

      case ButtonName.Confirm:
        dispatchRedux(productsCall({ route: 'delete', method: 'delete', _id, name, price, description, images, specification, imgDelete }))
        break;

      case ButtonName.Product:
        dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'products', value: targetButton.value } })
        const filterProductList = productsList.find(prod => prod._id === targetButton.value)!
        const departmentFilter = products.find(dep => dep._id === department)!
        const categoryFilter = departmentFilter?.categoriesId.find(cat => cat._id === category)!
        const subcategoryFilter = categoryFilter?.subcategoriesId.find(sub => sub._id === subcategory)!
        const dataProductDetail: DataProductDetail = {
          breadcrumb: [departmentFilter?.name, categoryFilter?.name, subcategoryFilter?.name],
          product: filterProductList
        }
        setProductDetail(dataProductDetail)
        return;

      case ButtonName.AddSpecification:
        setSelectedProducts((prevData) => ({ ...prevData, specification: [...prevData.specification, { key: '', value: '' }] }));
        return;

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
      {product && productDetail && <ProductDetail product={productDetail} />}
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

