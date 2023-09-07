import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, ProductsProps, callApiProduct } from './interface.products';
import { Route, makeImagesRequest } from '../../../../services/imagesApi';

// Función para transformar la especificación
// function transformSpecification(originalSpecification) {
//   return originalSpecification.map((item) => {
//     const key = Object.keys(item)[0];
//     const value = item[key];
//     return { key, value };
//   });
// }

// Función para manejar los cambios en la especificación
// function handleSpecificationChange(selectedProduct, specIndex, specField, value) {
//   const updatedSpecification = [...selectedProduct.requestData.specification];
//   updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: value };
//   return updatedSpecification;
// }

const initialState: InitialState = {
  productsList: [],
  selectedProduct: { productId: "", subcategoryId: "", requestData: { name: "", price: "", description: "", specification: [], images: [] } },
  showDeleteModal: false
}

const Products = ({ products }: ProductsProps) => {
  const { dashboard: { state: { inventory: { department, category, subcategory } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const mutation = useMutation(callApiProduct, { onSuccess: () => { queryClient.invalidateQueries(['product']) } });
  const [state, setState] = useState<InitialState>(initialState)
  const { productsList, selectedProduct, showDeleteModal } = state;

  useEffect(() => {
    if (products) setState(prevState => ({ ...prevState, productsList: products }));
  }, [products, department, category, subcategory]);

  const handleOnChange: HandleOnChange = async (event) => {
    const { name, value, files } = event.target;

    if (name === 'images') {
      try {
        const formData = new FormData();
        if (files) {
          formData.append('image', files[0], `${selectedProduct.requestData.name}.${files[0].type.split('/')[1]}`);
          const { imageUrl } = await makeImagesRequest(Route.ImagesCreate).withOptions({ requestData: formData })
          setState(prevState => ({ ...prevState, selectedProduct: { ...prevState.selectedProduct, requestData: { ...prevState.selectedProduct.requestData, images: [...prevState.selectedProduct.requestData.images, imageUrl] } } }))
        }
      } catch (error) {
        console.error('Error al cargar la imagen', error);
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
          await mutation.mutateAsync({ selectedProduct: { ...selectedProduct, subcategoryId: subcategory }, state: 'create' })
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

      default:
        break;

    }
    emptyProducts();
    setState(prevState => ({ ...prevState, showDeleteModal: false, selectedProduct: initialState.selectedProduct }));
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
        <ProductsForm selectedProduct={selectedProduct} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
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

export default Products;

