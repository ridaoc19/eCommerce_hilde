import React, { useEffect, useState } from 'react';
import useModalConfirm from '../../../../hooks/useModalConfirm/useModalConfirm';
import useMutationProduct from '../../../../hooks/useMutationProduct';
import useProductFilter from '../../../../hooks/useProductFilter';
import useValidations from '../../../../hooks/useValidations';
import { HandleChangeTextSelect, HandleClick } from '../../../../interfaces/global.interface';
import { RouteProduct } from '../../../../services/productRequest';
import { filterData, updateChangeListEntry } from '../productCreation/helpers';
import ProductEntryForm from './ProductEntryForm';
import ProductEntryList from './ProductEntryList';
import { ButtonName, InitialStateEntry, initialStateEntry } from './helpers';

const ProductEntry: React.FC = () => {
  const { ModalComponent, closeModal, openModal } = useModalConfirm()

  const { tools, status } = useMutationProduct();
  const [state, setState] = useState<InitialStateEntry>(initialStateEntry);
  const { getValidationErrors } = useValidations();
  const { findItemById, isFetching } = useProductFilter();

  useEffect(() => {
    if (!isFetching) {
      let res = findItemById({ id: state._id })
      const updateData = { ...state.data, department: res.department.data, category: res.category.data, subcategory: res.subcategory.data, product: res.product.data }
      setState(prevState => ({
        ...prevState,
        changeForm: initialStateEntry.changeForm,
        changeList: initialStateEntry.changeList,
        breadcrumb: res.breadcrumb,
        data: updateData,
        intactData: updateData
      }))
    }
    // eslint-disable-next-line
  }, [state._id, isFetching])


  const handleOnChange: HandleChangeTextSelect = (event) => {
    tools.resetError()
    const { name, value } = event.target;

    if (['department', 'category', 'subcategory', 'product'].includes(name)) {
      const nameKey = name as keyof InitialStateEntry['changeList']
      const { filterDataResponse } = filterData({ isEdit: false, name: nameKey, data: state.data, intactData: state.intactData, value })
      const { updateChangeListEntryResponse } = updateChangeListEntry({ isEdit: false, name: nameKey, state, value })
      setState(prevState => ({
        ...prevState,
        data: filterDataResponse,
        changeList: updateChangeListEntryResponse
      }))
    } else {

      if (['sellingPrice', 'stock'].includes(name)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        const newValue = !isNaN(parseInt(numericValue)) ? parseInt(numericValue) : 0
        const { field, message, stop } = getValidationErrors({ fieldName: name, value: newValue })
        if (stop) return setState({ ...state, error: { ...state.error, [field]: message } })
        return setState(prevState => ({
          ...prevState,
          error: { ...prevState.error, [field]: message },
          changeForm: { ...prevState.changeForm, [name]: newValue }
        }))
      }
      else {
        const { field, message, stop } = getValidationErrors({ fieldName: name, value: value })
        if (stop) return setState({ ...state, error: { ...state.error, [field]: message } })

        return setState(prevState => ({
          ...prevState,
          error: { ...prevState.error, [field]: message },
          changeForm: { ...prevState.changeForm, [name]: value }
        }))
      }
    }

  }

  const handleOnClick: HandleClick = async (event) => {
    event.preventDefault();
    const { name, value } = event.target as HTMLButtonElement;
    switch (name) {
      case ButtonName.Clean:
        setState(initialStateEntry);
        break;

      case ButtonName.Save:
        tools.fetch(RouteProduct.ProductEntry).options({ requestData: state.changeList.product })
        return;

      case ButtonName.FilterProduct:
        setState(prevState => ({
          ...prevState,
          _id: value,
        }))
        return

      case ButtonName.FilterOpenForm:
        const changeListKey = Object.keys(initialStateEntry.changeList['product']);
        const resultFound = Object.entries(findItemById({ id: value })['product']);

        const objectUpdate = resultFound.reduce((acc, [key, value]) => {
          if (changeListKey.includes(key)) {
            return { ...acc, [key]: value };
          }
          return acc;
        }, {}) as InitialStateEntry['changeList']['product'];

        setState({ ...state, changeList: { ...state.changeList, product: objectUpdate } })
        return

      case ButtonName.AddVariant:
        if (Object.entries(state.changeForm).reduce<string[]>((acc, [keyForm, valueForm]) => {
          const { field, message } = getValidationErrors({ fieldName: keyForm, value: valueForm });
          if (field === '_id') return acc
          setState(prevState => ({ ...prevState, error: { ...prevState.error, [field]: message } }));
          if (message) return [...acc, field];
          return acc;
        }, []).length > 0) return;

        setState(prevState => ({
          ...prevState,
          changeList: { ...prevState.changeList, product: { ...prevState.changeList.product, variants: [...prevState.changeList.product.variants, state.changeForm] } },
          changeForm: initialStateEntry.changeForm
        }))
        return

      case ButtonName.EditVariant:
        setState(prevState => ({
          ...prevState,
          changeForm: [...prevState.changeList.product.variants].find((_elem, index) => index === parseInt(value))!,
          changeList: {
            ...prevState.changeList,
            product: {
              ...prevState.changeList.product,
              variants: [...prevState.changeList.product.variants].filter((_elem, index) => index !== parseInt(value))
            }
          }
        }))
        return

      case ButtonName.RemoveVariant:
        const handleConfirm = () => {
          setState(prevState => ({
            ...prevState,
            changeForm: initialStateEntry.changeForm,
            changeList: {
              ...prevState.changeList, product: {
                ...prevState.changeList.product,
                variants: [...prevState.changeList.product.variants].filter((_elem, index) => index !== parseInt(value))
              }
            },
          }))
        };

        const handleCancel = () => {
          closeModal()
        };
        openModal(`Deseas eliminar variante?`, handleConfirm, handleCancel);
        return

      default:
        break;

    }
  };
  return (
    <>
      {ModalComponent}
      {!isFetching && state.breadcrumb.length > 0 && <ProductEntryList handleOnClick={handleOnClick} state={state} handleOnChange={handleOnChange} />}
      {state.changeList.product._id && <ProductEntryForm state={state} status={status} handleOnChange={handleOnChange} handleOnClick={handleOnClick} />}
    </>
  );
};

export default ProductEntry;
