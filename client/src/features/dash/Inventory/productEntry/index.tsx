import React, { useEffect, useState } from 'react';
import useProductFilter from '../../../../hooks/useProductFilter';
import useValidations from '../../../../hooks/useValidations';
import ProductEntryForm from './ProductEntryForm';
import ProductEntryList from './ProductEntryList';
import { ButtonName, HandleOnChange, HandleOnClick, InitialState, NestedData, callApiProductEntry, getProperty } from './interface.ProductEntry';
import { IProduct } from '../../../../interfaces/product.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const initialState: InitialState = {
  _id: "",
  intactData: {} as NestedData,
  data: {
    department: [],
    category: [],
    subcategory: [],
    product: [],
  },
  breadcrumb: [],
  changeList: { department: "", category: "", subcategory: "", product: "" },
  changeForm: { size: "", color: "", purchasePrice: 0, sellingPrice: 0, stock: 0 },
  selectedProduct: { productId: "", requestData: { _id: "", name: "", brand: "", description: "", specification: [], images: [], variants: [] } },
}


const ProductEntry: React.FC = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(callApiProductEntry, { onSuccess: () => { queryClient.invalidateQueries(IProduct.PRODUCT_NAME_QUERY) } });
  const [state, setState] = useState(initialState);
  const { getValidationErrors } = useValidations();
  const { findItemById } = useProductFilter();

  useEffect(() => {
    let res = findItemById({ id: state._id })
    const updateData = { ...state.data, department: res.department.data, category: res.category.data, subcategory: res.subcategory.data, product: res.product.data }
    setState(prevState => ({ ...prevState, breadcrumb: res.breadcrumb, data: updateData, intactData: updateData }))
    // eslint-disable-next-line
  }, [state._id])


  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === 'department' || name === 'category' || name === 'subcategory' || name === 'product') {
      const currentValue = getProperty(state.intactData, name as keyof NestedData);
      const resFilter = currentValue.map(e => e).filter(d => d.name.toString().toLowerCase().includes(value.toLowerCase()))
      setState(prevState => ({ ...prevState, data: { ...prevState.data, [name]: resFilter }, changeList: { ...prevState.changeList, [name]: value } }))
    } else {
      if (name === 'purchasePrice' || name === 'sellingPrice' || name === 'stock') {
        const numericValue = value.replace(/[^0-9]/g, '');
        const newValue = !isNaN(parseInt(numericValue)) ? parseInt(numericValue) : 0
        console.log(getValidationErrors({ fieldName: name, value: newValue }));
        return setState(prevState => ({ ...prevState, changeForm: { ...prevState.changeForm, [name]: newValue } }))
      }
      else {
        return setState(prevState => ({ ...prevState, changeForm: { ...prevState.changeForm, [name]: value } }))
      }
    }

  }

  const handleOnClick: HandleOnClick = async (event) => {
    event.preventDefault();
    const { name, value } = event.target as HTMLButtonElement;
    // const responseError = getValidationErrors({ fieldName: 'name', value: selectedCategory.requestData.name })
    switch (name) {
      case ButtonName.Edit:
        return;

      case ButtonName.Delete:
        return;

      case ButtonName.Clean:
        setState(initialState);
        break;

      case ButtonName.Save:
        // if (responseError.error) return setState(prevState => ({ ...prevState, validationError: { name: responseError.error } }))
        // department_id && await mutateAsync({ ...selectedCategory, departmentId: department_id });
        // setState(prevState => ({ ...prevState, selectedCategory: initialState.selectedCategory }))
        mutateAsync(state.selectedProduct)

        return;

      case ButtonName.Confirm:
        // setState(prevState => ({ ...prevState, showDeleteModal: false }));
        // collectFunctions.updateClickConfirm({ category, state })
        // await mutateAsync(selectedCategory);
        break;

      case ButtonName.FilterProduct:
        setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: "" } }))
        return

      case ButtonName.FilterOpenForm:
        setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: value, requestData: findItemById({ id: value }).product } }))
        return

      case ButtonName.AddVariant:
        setState(prevState => ({
          ...prevState,
          selectedProduct: {
            ...prevState.selectedProduct,
            requestData: {
              ...prevState.selectedProduct.requestData,
              variants: [...prevState.selectedProduct.requestData.variants, state.changeForm]
            }
          }
        }))
        setState(prevState => ({ ...prevState, changeForm: initialState.changeForm }))
        return

      case ButtonName.EditVariant:
        setState(prevState => ({
          ...prevState,
          changeForm: [...prevState.selectedProduct.requestData.variants].find((_elem, index) => index === parseInt(value))!,
          selectedProduct: {
            ...prevState.selectedProduct,
            requestData: {
              ...prevState.selectedProduct.requestData,
              variants: [...prevState.selectedProduct.requestData.variants].filter((_elem, index) => index !== parseInt(value))
            }
          }
        }))
        return

      case ButtonName.RemoveVariant:
        setState(prevState => ({
          ...prevState,
          selectedProduct: {
            ...prevState.selectedProduct,
            requestData: {
              ...prevState.selectedProduct.requestData,
              variants: [...prevState.selectedProduct.requestData.variants].filter((_elem, index) => index !== parseInt(value))
            }
          }
        }))
        return

      case ButtonName.Add:
        break;

      case ButtonName.Cancel:
        break;

      default:
        break;

    }
    // setState(emptyCategory({ category, state }))
  };

  return (
    <div>
      <ProductEntryList handleOnClick={handleOnClick} state={state} handleOnChange={handleOnChange} />
      {state.selectedProduct.productId && <ProductEntryForm state={state} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />}
    </div>
  );
};

export default ProductEntry;
