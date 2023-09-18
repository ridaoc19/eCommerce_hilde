import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import useValidations from '../../../../../hooks/useValidations';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import { IProduct } from '../../../../../interfaces/product.interface';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, ProductsProps, callApiProduct } from './interface.products';
import useProductAdd from './useProductAdd';
import { imagesAdmin } from '../../../../../services/imagesApi';

const initialState: InitialState = {
  productsList: [],
  selectedProduct: { productId: "", subcategoryId: "", requestData: { name: "", price: "", description: "", specification: [], images: [] } },
  temporaryImages: { get: [], delete: [] },
  validationError: { name: "", price: "", description: "", specification: "", images: "", specificationKey: "", specificationValue: "" },
  showDeleteModal: false
}

const ProductInfo = ({ products }: ProductsProps) => {
  const { collectFunctions, emptyProduct } = useProductAdd({ initialState })
  const { getValidationErrors } = useValidations();

  const { dashboard: { state: { inventory: { department_id, category_id, subcategory_id } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(callApiProduct, { onSuccess: () => { queryClient.invalidateQueries(IProduct.PRODUCT_NAME_QUERY) } });
  const [state, setState] = useState<InitialState>(initialState)
  const { productsList, selectedProduct, temporaryImages, showDeleteModal } = state;

  useEffect(() => {
    if (products) {
      setState(prevState => ({ ...prevState, productsList: products }));
    }
  }, [products, department_id, category_id, subcategory_id]);

  const handleOnChange: HandleOnChange = async (event) => {
    const { name, value } = event.target;

    const responseError = getValidationErrors({ fieldName: name, value })
    setState(collectFunctions.updateChangeProducts({ state, event, responseError }))
  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const targetButton = event.target as HTMLButtonElement;
    const { name, value } = event.target as HTMLButtonElement;

    switch (name) {
      case ButtonName.Edit:
        setState(collectFunctions.updateClickEdit({ products, state, value }))
        return;

      case ButtonName.Delete:
        setState(collectFunctions.updateClickDelete({ products, state, value }))
        return;

      case ButtonName.Save:
        const totalError = Object.entries(selectedProduct.requestData).map(([key, value]) => {
          const responseError = getValidationErrors({ fieldName: key, value })
          setState(prevState => ({ ...prevState, validationError: { ...prevState.validationError, [key]: responseError.error } }))
          return responseError.error
        }).filter(e => e)
        // valida images
        const totalImages = state.temporaryImages.get.length + state.selectedProduct.requestData.images.length;
        if (totalImages === 0) setState(prevState => ({ ...prevState, validationError: { ...prevState.validationError, images: 'Debes subir al menos una imagen' } }))
        if (totalImages > 3) setState(prevState => ({ ...prevState, validationError: { ...prevState.validationError, images: 'No puedes subir más de tres imágenes' } }))

        if (totalError.length > 0 || totalImages === 0 || totalImages > 3) return
        // GUARDA
        if (selectedProduct.productId) {
          if (temporaryImages.get.length > 0 || temporaryImages.delete.length > 0) {
            const responseImages = await imagesAdmin({ toRequest: { file: temporaryImages.get, name: selectedProduct.requestData.name }, toDelete: temporaryImages.delete })
            await mutateAsync({ ...selectedProduct, requestData: { ...selectedProduct.requestData, images: [...selectedProduct.requestData.images, ...responseImages] } })
          } else {
            await mutateAsync({ ...selectedProduct })
          }
        } else if (subcategory_id) {
          const responseImages = await imagesAdmin({ toRequest: { file: temporaryImages.get, name: selectedProduct.requestData.name } })
          await mutateAsync({ ...selectedProduct, subcategoryId: subcategory_id, requestData: { ...selectedProduct.requestData, images: responseImages } })
        }
        break;

      case ButtonName.Confirm:
        collectFunctions.updateClickConfirm({ products, state })
        await mutateAsync({ ...selectedProduct })
        break;

      case ButtonName.Product:
        dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'products_id', value: targetButton.value } })
        return;

      case ButtonName.AddSpecification:
        setState(collectFunctions.updateClickAddSpecification({ products, state }))
        return;

      case ButtonName.RemoveSpecification:
        setState(collectFunctions.updateClickRemoveSpecification({ state, products, event }))
        return;

      case ButtonName.FileDelete:
        setState(collectFunctions.updateClickFileDelete({ state, products, event }))
        return

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      case ButtonName.Clean:
        break;

      default:
        break;

    }
    setState(emptyProduct({ products, state }))
  };

  return (
    <div>
      <div>
        <ProductsList isLoading={isLoading} productsList={productsList} handleOnClick={handleOnClick} />
      </div>
      <div>
        <ProductsForm state={state} isLoading={isLoading} products={products} temporaryImages={temporaryImages} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      </div>
      {showDeleteModal &&
        <ModalConfirm
          message={`¿Estás seguro de eliminar '${products.find(nam => nam._id === selectedProduct.productId)?.name}'?`}
          handleOnClick={handleOnClick}
          Confirm={ButtonName.Confirm}
          Cancel={ButtonName.Cancel} />}
    </div>
  );
};

export default ProductInfo;

