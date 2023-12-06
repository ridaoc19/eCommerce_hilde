import { useEffect, useState } from "react";
import useMutationProduct from "../../../../hooks/useMutationProduct";
import useProductFilter from "../../../../hooks/useProductFilter";
import { HandleChangeText, HandleChangeTextArea } from "../../../../interfaces/global.interface";
import { useValidations } from "../../../auth/login";
import { InitialState, filterData, initialState, updateChangeList, updateSelect } from "./helpers";

function useStateProductCreation() {
  const { getValidationErrors } = useValidations();
  const { tools, status } = useMutationProduct();
  const { findItemById, isFetching } = useProductFilter();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!isFetching) {
      const res = findItemById({ id: state._id });
      const updateData = { ...state.data, department: res.department.data, category: res.category.data, subcategory: res.subcategory.data, product: res.product.data };

      setState(prevState => ({
        ...prevState,
        breadcrumb: res.breadcrumb,
        select: initialState.select,
        data: updateData,
        intactData: updateData,
        changeList: {
          department: { _id: res.breadcrumb.find(e => e.name_id === 'department')?._id || "", department: "" },
          category: { _id: res.breadcrumb.find(e => e.name_id === 'category')?._id || "", category: "" },
          subcategory: { _id: res.breadcrumb.find(e => e.name_id === 'subcategory')?._id || "", subcategory: "" },
          product: { _id: res.breadcrumb.find(e => e.name_id === 'product')?._id || "", product: "", brand: "", description: "", images: [], specification: [] },
        },
        temporaryImages: initialState.temporaryImages
      }));
    }
    // Limpia files
    const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
    if (inputElement) inputElement.value = '';
    // eslint-disable-next-line
  }, [state._id, isFetching]);

  const handleOnChange: HandleChangeText = (event) => {
    const name = event.target.name as keyof InitialState['changeList'];
    const { value } = event.target;
    let isEdit = state.select[name] === 'edit'
    tools.resetError()

    const { filterDataResponse } = filterData({ isEdit, name, state, value })
    const { updateChangeListResponse } = updateChangeList({ isEdit, name, state, value })
    const { updateSelectResponse } = updateSelect({ isEdit, name, state, filterData: filterDataResponse })

    const { field, message, stop } = getValidationErrors({ fieldName: name, value })
    const isRenderError = ['create', 'edit'].includes(updateSelectResponse[name])
    if (isRenderError && stop) return setState((prevState) => ({ ...prevState, error: { ...prevState.error, [field]: message } }))

    setState((prevState) => ({
      ...prevState,
      data: filterDataResponse,
      changeList: updateChangeListResponse,
      select: updateSelectResponse,
      error: isRenderError ? { ...prevState.error, [field]: message } : { ...prevState.error, [field]: "" }
    }));

  };


  const handleOnChangeProduct: HandleChangeText = (event) => {
    const { name, value, files } = event.target;
    const { field, message, stop } = getValidationErrors({ fieldName: name, value })
    tools.resetError()

    if (name === 'images') {
      if (files && files.length > 0) {
        const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
        const fileList = Array.from(files) as File[];
        const imagesFile = fileList.length + state.temporaryImages.get.length
        const imagesString = state.changeList.product.images.length
        const totalImages = imagesFile + imagesString;

        if (totalImages > 3) {
          if (inputElement) inputElement.value = '';
          const messageImage = imagesString > 0 ? `Tienes almacenadas ${imagesString} imágenes y quieres agregar ${imagesFile}, solo puedes agregar un total 3 imágenes` : `Solo se puede subir tres imágenes y estas cargando ${totalImages}`
          setState({ ...state, error: { ...state.error, images: messageImage } })
        } else if (totalImages === 0) {
          setState({ ...state, error: { ...state.error, images: 'Debes subir al menos una imagen' } })
        } else {
          setState(prevState => ({
            ...prevState,
            error: { ...prevState.error, images: '' },
            temporaryImages: { ...prevState.temporaryImages, get: [...state.temporaryImages.get, ...fileList] }
          }))
        }
      }
    } else if (name === 'specificationKey' || name === 'specificationValue') {
      const specIndex = parseInt(event.target.dataset.index || '0', 10);
      const specField = name === 'specificationKey' ? 'key' : 'value';
      const updatedSpecification = [...state.changeList.product.specification];
      updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: value };
      if (stop) return setState((prevState) => ({ ...prevState, error: { ...prevState.error, [field]: message } }))

      setState(prevState => ({
        ...prevState,
        error: { ...prevState.error, [field]: message },
        changeList: { ...prevState.changeList, product: { ...prevState.changeList.product, specification: updatedSpecification } }
      }))
    }
    else {
      if (stop) return setState((prevState) => ({ ...prevState, error: { ...prevState.error, [field]: message } }))
      setState(prevState => ({
        ...prevState,
        error: { ...prevState.error, [field]: message },
        changeList: { ...prevState.changeList, product: { ...prevState.changeList.product, [name]: value } }
      }))
    }
  }

  const handleOnChangeTextArea: HandleChangeTextArea = (event) => {
    const { name, value } = event.target;
    const { field, message, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setState((prevState) => ({ ...prevState, error: { ...prevState.error, [field]: message } }))

    setState(prevState => ({
      ...prevState,
      error: { ...prevState.error, [field]: message },
      changeList: { ...prevState.changeList, product: { ...prevState.changeList.product, [name]: value } }
    }))
  }

  return { state, setState, isFetching, handleOnChange, findItemById, tools, status, handleOnChangeProduct, handleOnChangeTextArea };
}

export default useStateProductCreation;