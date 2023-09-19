import React, { useContext } from 'react';
import { InitialState, ProductsProps } from './interface.products';
import { ResponseError } from '../../../../../../hooks/useValidations';
import { IContext } from '../../../../../../interfaces/hooks/context.interface';
import { CreateContext } from '../../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../../hooks/useContext/dash/reducer';
import { imagesAdmin } from '../../../../../../services/imagesApi';


type UpdateChangeProducts = { state: InitialState, responseError: ResponseError, event: React.ChangeEvent<HTMLInputElement>, }

interface StateProducts extends ProductsProps {
  state: InitialState;
}


function useProductAdd({ initialState }: { initialState: InitialState }) {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;

  function emptyProduct({ products, state }: StateProducts) {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'productsEmpty_id', value: "" } })
    const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
    if (inputElement) inputElement.value = '';
    return {
      ...state,
      validationError: initialState.validationError,
      temporaryImages: initialState.temporaryImages,
      showDeleteModal: false,
      selectedProduct: initialState.selectedProduct,
      productsList: products
    };
  }

  const collectFunctions = {
    updateChangeProducts({ state, event, responseError }: UpdateChangeProducts) {
      const { name, value, files } = event.target;
      const { stop, error } = responseError;

      if (name === 'images' && files) {

        if (files && files.length > 0) {
          const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
          const fileList = Array.from(files) as File[];
          const totalImages = fileList.length + state.temporaryImages.get.length
          if (totalImages > 3) {
            if (inputElement) inputElement.value = '';
            return {
              ...state,
              validationError: { ...state.validationError, images: 'No puedes subir más de tres imágenes' }
            }
          } else {

            return {
              ...state,
              validationError: { ...state.validationError, images: '' },
              temporaryImages: { ...state.temporaryImages, get: [...state.temporaryImages.get, ...fileList] }
            }
          }
        }

      } else if (name === 'specificationKey' || name === 'specificationValue') {
        const specIndex = parseInt(event.target.dataset.index || '0', 10);
        const specField = name === 'specificationKey' ? 'key' : 'value';
        const updatedSpecification = [...state.selectedProduct.requestData.specification];
        updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: value };
        const newValidationError = { ...state.validationError, [name]: error };
        return {
          ...state,
          selectedProduct: stop
            ? { ...state.selectedProduct }
            : { ...state.selectedProduct, requestData: { ...state.selectedProduct.requestData, specification: updatedSpecification } },
          validationError: newValidationError
        }
      } else {
        const newValidationError = { ...state.validationError, [name]: error };
        return {
          ...state,
          selectedProduct: stop
            ? { ...state.selectedProduct }
            : { ...state.selectedProduct, requestData: { ...state.selectedProduct.requestData, [name]: value } },
          validationError: newValidationError
        }
      }
      return state;
    },

    updateClickEdit({ products, state, value }: StateProducts & { value: string }) {
      emptyProduct({ products, state });
      const updatedList = products?.filter(prod => prod._id !== value) || [];
      const editedProducts = products?.find(prod => prod._id === value);
      if (editedProducts) {
        let { _id, name, brand, description, specification, images } = editedProducts;
        return {
          ...state,
          productsList: updatedList,
          selectedProduct: {
            ...state.selectedProduct, productId: _id, requestData: {
              name, brand, description,
              specification: specification.map(({ key, value }) => {
                return { key, value };
              }),
              images
            }
          }
        };
      }
      return state;
      // const updatedList = products.filter(pro => pro._id !== value) || [];
      // const editedCategory = products.find(pro => pro._id === value);
      // if (editedCategory) {
      //   const { _id, name } = editedCategory;
      //   return {
      //     ...state,
      //     selectedProduct: { ...state.selectedProduct, subcategoryId: _id, requestData: { name } },
      //     subcategoryList: updatedList
      //   };
      // }
      // return state
    },


    updateClickDelete({ products, state, value }: StateProducts & { value: string }) {
      emptyProduct({ products, state });
      const updatedList = products.filter(pro => pro._id !== value)
      return {
        ...state,
        selectedProduct: { ...state.selectedProduct, productId: value },
        showDeleteModal: true,
        productsList: updatedList
      };
      // setState(state => ({ ...state, showDeleteModal: true, selectedProduct: { ...state.selectedProduct, 
      // productId: value } }));

    },

    updateClickConfirm({ products, state }: StateProducts) {
      const filterImages = products.find(pro => pro._id === state.selectedProduct.productId)?.images || []
      filterImages.length > 0 && imagesAdmin({ toDelete: filterImages })
    },

    updateClickAddSpecification({ state }: StateProducts) {
      return {
        ...state,
        validationError: { ...state.validationError, specification: '' },
        selectedProduct: {
          ...state.selectedProduct,
          requestData: {
            ...state.selectedProduct.requestData,
            specification: [...state.selectedProduct.requestData.specification, { key: '', value: '' }]
          }
        }
      }

    },

    updateClickRemoveSpecification({ state, event }: StateProducts & { event: React.MouseEvent<HTMLButtonElement> }) {
      const { selectedProduct } = state;
      const targetButton2 = event.target as HTMLElement;
      const specIndexToRemove = parseInt(targetButton2.dataset.index || '0', 10);
      const updatedSpecification = selectedProduct.requestData.specification.filter((_, index) => index !== specIndexToRemove);
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          requestData: {
            ...state.selectedProduct.requestData,
            specification: updatedSpecification
          }
        }
      };
    },

    updateClickFileDelete({ state, event }: StateProducts & { event: React.MouseEvent<HTMLButtonElement> }) {
      const { dataset, value } = event.target as HTMLButtonElement;
      const { temporaryImages, selectedProduct } = state;
      if (dataset.type === 'file') { // elimina files
        temporaryImages.get.splice(+value, 1)
        return { ...state, temporaryImages }
      } else if (dataset.type === 'url') { //elimina string
        const urlDelete = selectedProduct.requestData.images[+value]
        const filterImage = selectedProduct.requestData.images.filter(img => img !== urlDelete)
        return { ...state, temporaryImages: { ...state.temporaryImages, delete: [...state.temporaryImages.delete, urlDelete] }, selectedProduct: { ...state.selectedProduct, requestData: { ...state.selectedProduct.requestData, images: filterImage } } }
      }
      return state
    }

  }

  return { collectFunctions, emptyProduct };
}

export default useProductAdd;