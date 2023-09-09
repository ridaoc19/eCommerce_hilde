import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, ProductsProps, callApiProduct } from './interface.products';
import { Route, makeImagesRequest } from '../../../../../services/imagesApi';

const initialState: InitialState = {
  productsList: [],
  selectedProduct: { productId: "", subcategoryId: "", requestData: { name: "", price: "", description: "", specification: [], images: [] } },
  temporaryImages: [],
  showDeleteModal: false
}

const ProductInfo = ({ products }: ProductsProps) => {
  const { dashboard: { state: { inventory: { department, category, subcategory } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiProduct, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState<InitialState>(initialState)
  const { productsList, selectedProduct, temporaryImages, showDeleteModal } = state;
  // const LSImages: string[] | undefined = localStorage.images ? JSON?.parse(localStorage?.images) : undefined

  useEffect(() => {
    if (products) setState(prevState => ({ ...prevState, productsList: products }));
    //IMAGES
    // if (LSImages && LSImages.length !== selectedProduct.requestData.images.length) {
    //   LSImages.forEach((imageId: string) => {
    //     makeImagesRequest(Route.ImagesDelete).withOptions({ imageId: imageId.replace("uploads\\", "") })
    //   });
    //   localStorage.removeItem('images')
    // }
  }, [products, department, category, subcategory]);

  const handleOnChange: HandleOnChange = async (event) => {
    const { name, value, files } = event.target;

    if (name === 'images' && files) {
      setState((prevState) => ({ ...prevState, temporaryImages: [...prevState.temporaryImages, files[0]], }));
      // try {
      // const formData = new FormData();
      // if (files) {
      // formData.append('image', files[0], `${selectedProduct.requestData.name}.${files[0].type.split('/')[1]}`);
      // const { imageUrl } = await makeImagesRequest(Route.ImagesCreate).withOptions({ requestData: formData })
      // localStorage.images = LSImages ? JSON.stringify([...LSImages, imageUrl]) : JSON.stringify([imageUrl])
      // setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, images: [...prevState.selectedProduct.requestData.images, imageUrl] } } }))
      // }
      // } catch (error) {
      //   console.error('Error al cargar la imagen', error);
      // }
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
                specification: specification.map((item) => {
                  const [key, value] = Object.entries(item)[0];
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
        setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, productId: targetButton.value } }));
        setState(prevState => ({ ...prevState, showDeleteModal: true }));
        return;

      case ButtonName.Clean:
        if (products) setState(prevState => ({ ...prevState, productsList: products }));
        break;

      case ButtonName.Save:
        if (selectedProduct.productId) {
          await mutation.mutateAsync({ selectedProduct, state: 'edit' })
        } else if (subcategory) {
          const form = new FormData();
          temporaryImages.forEach((image, _index) => {
            form.append(`images`, image, selectedProduct.requestData.name);  // Usar el mismo nombre
          });
          let carga = await makeImagesRequest(Route.ImagesCreateAll).withOptions({ requestData: form })
          console.log(carga);

          // await mutation.mutateAsync({ selectedProduct: { ...selectedProduct, subcategoryId: subcategory }, state: 'create' })
        }
        return;

      case ButtonName.Confirm:
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
        if (temporaryImages.length > 0) {
          temporaryImages.splice(+targetButton.value, 1)
          setState(prevState => ({ ...prevState, temporaryImages }))
        } else {
          selectedProduct.requestData.images.splice(+targetButton.value, 1)
          setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData } } }))

        }
        // const newImages = selectedProduct.requestData.images.filter(url => url !== targetButton.value)
        // makeImagesRequest(Route.ImagesDelete).withOptions({ imageId: targetButton.value.replace("uploads\\", "") })
        // setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, images: newImages } } }))
        // localStorage.images = JSON.stringify(newImages)
        return

      default:
        break;

    }
    emptyProducts();
    setState(prevState => ({ ...prevState, showDeleteModal: false, temporaryImages: [], selectedProduct: initialState.selectedProduct }));
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

