import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import ModalConfirm from '../../../../../components/common/modalConfirm';
import { CreateContext } from '../../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../../hooks/useContext/dash/reducer';
import useValidations from '../../../../../hooks/useValidations';
import { IContext } from '../../../../../interfaces/hooks/context.interface';
import { IProduct } from '../../../../../interfaces/product.interface';
import { imagesAdmin } from '../../../../../services/imagesApi';
import ProductsForm from './ProductForm';
import ProductsList from './ProductList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, ProductsProps, callApiProduct } from './interface.products';
import useProductAdd from './useProductAdd';

const initialState: InitialState = {
  productsList: [],
  selectedProduct: { productId: "", subcategoryId: "", requestData: { name: "", price: "", description: "", specification: [], images: [] } },
  temporaryImages: { get: [], delete: [] },
  validationError: { name: "", price: "", description: "", specification: [], images: [] },
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
    const { name, value } = event.target as HTMLButtonElement;
    const responseError = getValidationErrors({ fieldName: 'name', value: selectedProduct.requestData.name })
    console.log(responseError);

    switch (name) {
      case ButtonName.Edit:
        setState(collectFunctions.updateClickEdit({ products, state, value }))
        return;

      case ButtonName.Delete:
        setState(collectFunctions.updateClickDelete({ products, state, value }))
        return;

      case ButtonName.Save:
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

