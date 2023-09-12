import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import { imagesAdmin } from '../../../../../services/imagesApi';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, ProductsProps, callApiProduct } from './interface.products';
import { handleClickEdit } from './tools/functions';
import ProductDetail from './ProductDetail';

const initialState: InitialState = {
  productsList: [],
  selectedProduct: { productId: "", subcategoryId: "", requestData: { name: "", price: "", description: "", specification: [], images: [] } },
  temporaryImages: { get: [], delete: [] },
  showDeleteModal: false
}

const ProductInfo = ({ products }: ProductsProps) => {
  const { dashboard: { state: { inventory: { department_id, category_id, subcategory_id, products_id } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiProduct, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState<InitialState>(initialState)
  const { productsList, selectedProduct, temporaryImages, showDeleteModal } = state;

  useEffect(() => {
    if (products) {
      setState(prevState => ({ ...prevState, productsList: products }));
    }
    // eslint-disable-next-line
  }, [products, department_id, category_id, subcategory_id]);

  const handleOnChange: HandleOnChange = async (event) => {
    const { name, value, files } = event.target;

    if (name === 'images' && files) {
      if (files && files.length > 0) {
        const fileList = Array.from(files) as File[];
        setState((prevState) => ({ ...prevState, temporaryImages: { ...prevState.temporaryImages, get: [...prevState.temporaryImages.get, ...fileList] } }));
      }
    } else if (name === 'specificationKey' || name === 'specificationValue') {
      const specIndex = parseInt(event.target.dataset.index || '0', 10);
      const specField = name === 'specificationKey' ? 'key' : 'value';
      const updatedSpecification = [...selectedProduct.requestData.specification];
      updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: value };
      setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, specification: updatedSpecification } } }))
    } else {
      setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, [name]: value } } }))
    }
  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;

    switch (targetButton.name) {

      case ButtonName.Edit:
        emptyProductsContext();
        const { response } = handleClickEdit({ products, state, value: targetButton.value })
        setState(response)
        return;

      case ButtonName.Delete:
        emptyProductsContext();
        setState(prevState => ({ ...prevState, showDeleteModal: true, selectedProduct: { ...prevState.selectedProduct, productId: targetButton.value } }));
        return;

      case ButtonName.Clean:
        if (products) setState(prevState => ({ ...prevState, productsList: products }));
        break;

      case ButtonName.Save:
        if (selectedProduct.productId) {
          if (temporaryImages.get.length > 0 || temporaryImages.delete.length > 0) {
            const responseImages = await imagesAdmin({ toRequest: { file: temporaryImages.get, name: selectedProduct.requestData.name }, toDelete: temporaryImages.delete })
            await mutation.mutateAsync({ selectedProduct: { ...selectedProduct, requestData: { ...selectedProduct.requestData, images: [...selectedProduct.requestData.images, ...responseImages] } }, state: 'edit' })
          } else {
            await mutation.mutateAsync({ selectedProduct, state: 'edit' })
          }
        } else if (subcategory_id) {
          const responseImages = await imagesAdmin({ toRequest: { file: temporaryImages.get, name: selectedProduct.requestData.name } })
          await mutation.mutateAsync({ selectedProduct: { ...selectedProduct, subcategoryId: subcategory_id, requestData: { ...selectedProduct.requestData, images: responseImages } }, state: 'create' })
        }
        break;

      case ButtonName.Confirm:
        const filterImages = products.find(pro => pro._id === selectedProduct.productId)?.images
        if (filterImages && filterImages?.length > 0) { // si hay string imágenes para eliminar
          await imagesAdmin({ toDelete: filterImages })
        }
        await mutation.mutateAsync({ selectedProduct, state: 'delete' })
        break;

      case ButtonName.Product:
        dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'products_id', value: targetButton.value } })
        return;

      case ButtonName.AddSpecification:
        setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, specification: [...prevState.selectedProduct.requestData.specification, { key: '', value: '' }] } } }))
        return;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      case ButtonName.FileDelete:
        if (targetButton.dataset.type === 'file') { // elimina files
          temporaryImages.get.splice(+targetButton.value, 1)
          setState(prevState => ({ ...prevState, temporaryImages }))
        } else if (targetButton.dataset.type === 'url') { //elimina string
          const urlDelete = selectedProduct.requestData.images[+targetButton.value]
          const filterImage = selectedProduct.requestData.images.filter(img => img !== urlDelete)
          setState(prevState => ({ ...prevState, temporaryImages: { ...prevState.temporaryImages, delete: [...prevState.temporaryImages.delete, urlDelete] }, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, images: filterImage } } }))
        }
        return

      default:
        break;

    }
    emptyProductsContext();
    setState(prevState => ({ ...prevState, showDeleteModal: false, temporaryImages: { get: [], delete: [] }, selectedProduct: initialState.selectedProduct }));
    const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
    if (inputElement) inputElement.value = '';
  };

  const emptyProductsContext = () => { // limpia los id de context
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'productsEmpty_id', value: "" } })
  }

  const editedProducts = products?.find(prod => prod._id === products_id)

  return (
    <div>
      <div>
        <ProductsList productsList={productsList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <ProductsForm selectedProduct={selectedProduct} temporaryImages={temporaryImages} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {products_id && editedProducts && <ProductDetail product={editedProducts} />}
      {showDeleteModal &&
        <ModalConfirm
          message='¿Estás seguro de eliminar este producto?'
          handleOnClick={handleOnClick}
          Confirm={ButtonName.Confirm}
          Cancel={ButtonName.Cancel} />}
    </div>
  );
};

export default ProductInfo;

