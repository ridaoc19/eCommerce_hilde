import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import { Route, makeImagesRequest } from '../../../../../services/imagesApi';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, ProductsProps, callApiProduct } from './interface.products';

// function tienenLaMismaInformacion({ urlProduct, urlSelectedProduct }: { urlProduct: string[], urlSelectedProduct: string[] }) {
//   console.log(urlProduct.sort(), urlSelectedProduct.sort())
//   urlProduct.sort()
//   urlSelectedProduct.sort()
//   return JSON.stringify(urlProduct) === JSON.stringify(urlSelectedProduct);
// }

const initialState: InitialState = {
  productsList: [],
  selectedProduct: { productId: "", subcategoryId: "", requestData: { name: "", price: "", description: "", specification: [], images: [] } },
  temporaryImages: { get: [], delete: [] },
  showDeleteModal: false
}

const ProductInfo = ({ products }: ProductsProps) => {
  const productsCopy = [...products];
  const { dashboard: { state: { inventory: { department, category, subcategory } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiProduct, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState<InitialState>(initialState)
  const { productsList, selectedProduct, temporaryImages, showDeleteModal } = state;

  useEffect(() => {
    if (products) {
      setState(prevState => ({ ...prevState, productsList: productsCopy }));
    }
  }, [products, department, category, subcategory]);

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
      // const updatedSpecification = handleSpecificationChange(selectedProduct, specIndex, specField, value);
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
        emptyProducts();
        const updatedList = productsList?.filter(prod => prod._id !== targetButton.value) || [];
        const editedProducts = productsList?.find(prod => prod._id === targetButton.value);
        if (editedProducts) {
          let { _id, name, price, description, specification, images } = editedProducts;
          // transformSpecification(specification)
          setState(prevState => ({
            ...prevState,
            productsList: updatedList,
            selectedProduct: {
              ...prevState.selectedProduct, productId: _id, requestData: {
                name, price, description,
                specification: specification.map(({ key, value }) => {
                  return { key, value };
                }),
                images
              }
            }
          }));
        }
        return;

      case ButtonName.Delete:
        emptyProducts();
        setState(prevState => ({ ...prevState, showDeleteModal: true, selectedProduct: { ...prevState.selectedProduct, productId: targetButton.value } }));
        return;

      case ButtonName.Clean:
        if (products) setState(prevState => ({ ...prevState, productsList: productsCopy }));
        break;

      case ButtonName.Save:
        if (selectedProduct.productId) {
          if (temporaryImages.get.length > 0 || temporaryImages.delete.length > 0) {
            const form = new FormData();
            if (temporaryImages.get.length > 0) {
              temporaryImages.get.forEach((image, _index) => {
                form.append(`images`, image, `${selectedProduct.requestData.name}.${image.type.split("/")[1]}`);  // Usar el mismo nombre
              });
            }
            if (temporaryImages.delete.length > 0) {
              temporaryImages.delete.forEach((url, index) => form.append(`url[${index}]`, url));
            }
            let responseImages = (await makeImagesRequest(Route.ImagesCreateDelete).withOptions({ requestData: form })).imageUrl
            // const temp = [...selectedProduct.requestData.images, ...responseImages]
            // console.log(temp);

            await mutation.mutateAsync({ selectedProduct: { ...selectedProduct, requestData: { ...selectedProduct.requestData, images: [...selectedProduct.requestData.images, ...responseImages] } }, state: 'edit' })
          } else {
            await mutation.mutateAsync({ selectedProduct, state: 'edit' })
          }
        } else if (subcategory) {
          const form = new FormData();
          temporaryImages.get.forEach((image, _index) => {
            form.append(`images`, image, `${selectedProduct.requestData.name}.${image.type.split("/")[1]}`);  // Usar el mismo nombre
          });
          const carga = await makeImagesRequest(Route.ImagesCreate).withOptions({ requestData: form })
          await mutation.mutateAsync({ selectedProduct: { ...selectedProduct, subcategoryId: subcategory, requestData: { ...selectedProduct.requestData, images: carga.imageUrl } }, state: 'create' })
        }
        break;

      case ButtonName.Confirm:
        const filterImages = products.find(pro => pro._id === selectedProduct.productId)?.images
        if (filterImages && filterImages?.length > 0) {
          const form = new FormData();
          filterImages.forEach((url, index) => form.append(`url[${index}]`, url));
          await makeImagesRequest(Route.ImagesDelete).withOptions({ requestData: form })
        }
        await mutation.mutateAsync({ selectedProduct, state: 'delete' })
        break;

      case ButtonName.Product:
        dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'products', value: targetButton.value } })
        return;

      case ButtonName.AddSpecification:
        setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, specification: [...prevState.selectedProduct.requestData.specification, { key: '', value: '' }] } } }))
        return;

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      case ButtonName.FileDelete:
        // const imageDelete = im
        if (targetButton.dataset.type === 'file') {
          temporaryImages.get.splice(+targetButton.value, 1)
          setState(prevState => ({ ...prevState, temporaryImages }))
        } else if (targetButton.dataset.type === 'url') {
          const urlDelete = selectedProduct.requestData.images[+targetButton.value]
          console.log(urlDelete)
          const filterImage = selectedProduct.requestData.images.filter(img => img !== urlDelete)
          setState(prevState => ({ ...prevState, temporaryImages: { ...prevState.temporaryImages, delete: [...prevState.temporaryImages.delete, urlDelete] }, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, images: filterImage } } }))
        }
        return

      default:
        break;

    }
    emptyProducts();
    setState(prevState => ({ ...prevState, showDeleteModal: false, temporaryImages: { get: [], delete: [] }, selectedProduct: initialState.selectedProduct }));
    const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null;
    if (inputElement) inputElement.value = '';
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
        <ProductsForm selectedProduct={selectedProduct} temporaryImages={temporaryImages} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {/* {product && productDetail && <ProductDetail product={productDetail} />} */}
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

