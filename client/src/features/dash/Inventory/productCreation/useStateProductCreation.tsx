import { useEffect, useState } from "react";
import useMutationProduct from "../../../../hooks/useMutationProduct";
import useProductFilter from "../../../../hooks/useProductFilter";
import { HandleChangeText, HandleChangeTextArea, HandleClick } from "../../../../interfaces/global.interface";
import { useValidations } from "../../../auth/login";
import { ButtonName, InitialState, filterData, initialState, updateChangeList, updateSelect } from "./helpers";
import { RouteProduct } from "../../../../services/productRequest";
import { imagesAdmin } from "../../../../services/imagesApi";

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

  const handleOnClick: HandleClick = async (event) => {
    event.preventDefault();
    const { name, value, dataset } = event.target as HTMLButtonElement;
    const valueKey = value as keyof InitialState['changeList']
    setState({ ...state, error: initialState.error })
    tools.resetError()

    if (name !== ButtonName.FileDelete && name !== ButtonName.RemoveSpecification && name !== ButtonName.Save) {
      setState(prevState => ({ ...prevState, temporaryImages: initialState.temporaryImages }))
    }

    // const responseError = getValidationErrors({ fieldName: 'name', value: selectedCategory.requestData.name })
    switch (name) {
      case ButtonName.Clean:
        setState(initialState);
        break;

      case ButtonName.Save:
        if (Object.entries(state.changeList[valueKey]).reduce<string[]>((acc, [key, valuen]) => {
          const { field, message } = getValidationErrors({ fieldName: key, value: valuen });
          if (field === '_id') return acc
          setState(prevState => ({ ...prevState, error: { ...prevState.error, [field]: message } }));
          if (message) return [...acc, field];
          return acc;
        }, []).length > 0) return;

        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentCreate).options({ requestData: { department: state.changeList[valueKey].department } })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryCreate).options({ requestData: { category: state.changeList[valueKey].category }, paramId: state.changeList.department._id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryCreate).options({ requestData: { subcategory: state.changeList[valueKey].subcategory }, paramId: state.changeList.category._id })
            break
          case 'product':
            // valida images
            const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
            const imagesFile = state.temporaryImages.get.length
            const imagesString = state.changeList.product.images.length
            const totalImages = imagesFile + imagesString;

            if (totalImages > 3) {
              if (inputElement) inputElement.value = '';
              const messageImage = imagesString > 0 ? `Tienes almacenadas ${imagesString} imágenes y quieres agregar ${imagesFile}, solo puedes agregar un total 3 imágenes` : `Solo se puede subir tres imágenes y estas cargando ${totalImages}`
              setState({ ...state, error: { ...state.error, images: messageImage } })
            } else if (totalImages === 0) {
              setState({ ...state, error: { ...state.error, images: 'Debes subir al menos una imagen' } })
            }

            // GUARDA
            const responseImages = await imagesAdmin({
              toRequest: {
                file: state.temporaryImages.get, name: state.changeList.product.product.toLowerCase() // Convertir a minúsculas
                  .replace(/[^\w\d]/g, '') // Eliminar caracteres no alfanuméricos (letras y números)
                  .normalize('NFD') // Normalizar para eliminar tildes
                  .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos (tildes)
              }
            })
            tools.fetch(RouteProduct.ProductCreate).options({
              requestData: {
                product: state.changeList.product.product,
                brand: state.changeList.product.brand,
                description: state.changeList.product.description,
                specification: state.changeList.product.specification,
                images: responseImages
              },
              paramId: state.changeList.subcategory._id
            })
            break
          default:
            break;
        }
        return;

      case ButtonName.EditUpdate:
        const id = dataset._id!;
        const changeListKey = Object.keys(initialState.changeList[valueKey]);
        const resultFound = Object.entries(findItemById({ id: id })[valueKey]);

        const objectUpdate = resultFound.reduce((acc, [key, value]) => {
          if (changeListKey.includes(key)) {
            return { ...acc, [key]: value };
          }
          return acc;
        }, {});

        setState({
          ...state, changeList: {
            ...state.changeList, [valueKey]: objectUpdate
          }, select: { ...state.select, [valueKey]: 'edit' }
        })
        return

      case ButtonName.Edit:
        if (Object.entries(state.changeList[valueKey]).reduce<string[]>((acc, [key, valuen]) => {
          const { field, message } = getValidationErrors({ fieldName: key, value: valuen });
          if (field === '_id') return acc
          setState(prevState => ({ ...prevState, error: { ...prevState.error, [field]: message } }));
          if (message) return [...acc, field];
          return acc;
        }, []).length > 0) return;

        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentEdit).options({ requestData: { department: state.changeList[valueKey].department }, paramId: state.changeList[valueKey]._id })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryEdit).options({ requestData: { category: state.changeList[valueKey].category }, paramId: state.changeList[valueKey]._id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryEdit).options({ requestData: { subcategory: state.changeList[valueKey].subcategory }, paramId: state.changeList[valueKey]._id })
            break

          case 'product':
            // valida images
            const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
            const imagesFile = state.temporaryImages.get.length
            const imagesString = state.changeList.product.images.length
            const totalImages = imagesFile + imagesString;

            if (totalImages > 3) {
              if (inputElement) inputElement.value = '';
              const messageImage = imagesString > 0 ? `Tienes almacenadas ${imagesString} imágenes y quieres agregar ${imagesFile}, solo puedes agregar un total 3 imágenes` : `Solo se puede subir tres imágenes y estas cargando ${totalImages}`
              setState({ ...state, error: { ...state.error, images: messageImage } })
            } else if (totalImages === 0) {
              setState({ ...state, error: { ...state.error, images: 'Debes subir al menos una imagen' } })
            }
            // GUARDA
            // if (selectedProduct.productId) {
            if (state.temporaryImages.get.length > 0 || state.temporaryImages.delete.length > 0) {
              const responseImages = await imagesAdmin({
                toRequest: {
                  file: state.temporaryImages.get, name: state.changeList.product.product.toLowerCase() // Convertir a minúsculas
                    .replace(/[^\w\d]/g, '') // Eliminar caracteres no alfanuméricos (letras y números)
                    .normalize('NFD') // Normalizar para eliminar tildes
                    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos (tildes)
                }, toDelete: state.temporaryImages.delete
              })
              console.log(responseImages, "edit")
              tools.fetch(RouteProduct.ProductEdit).options({
                requestData: {
                  product: state.changeList.product.product,
                  brand: state.changeList.product.brand,
                  description: state.changeList.product.description,
                  specification: state.changeList.product.specification,
                  images: [...state.changeList.product.images, ...responseImages]
                },
                paramId: state.changeList.product._id
              })
            } else {
              tools.fetch(RouteProduct.ProductEdit).options({
                requestData: {
                  product: state.changeList.product.product,
                  brand: state.changeList.product.brand,
                  description: state.changeList.product.description,
                  specification: state.changeList.product.specification,
                  images: state.changeList.product.images
                },
                paramId: state.changeList.product._id
              })
            }
            // }
            break
          default:
            break;
        }
        return

      case ButtonName.Delete:
        const _id = dataset._id!
        switch (valueKey) {
          case 'department':
            const departmentFilterImages = state.intactData.department.find(pro => pro._id === _id)
              ?.categoriesId.flatMap(pro => pro.subcategoriesId)
              .flatMap(pro => pro.productsId).flatMap(img => img.images) || []
            departmentFilterImages.length > 0 && imagesAdmin({ toDelete: departmentFilterImages })
            tools.fetch(RouteProduct.DepartmentDelete).options({ paramId: _id })
            break;
          case 'category':
            const categoryFilterImages = state.intactData.category.find(pro => pro._id === _id)?.subcategoriesId
              .flatMap(pro => pro.productsId).flatMap(img => img.images) || []
            categoryFilterImages.length > 0 && imagesAdmin({ toDelete: categoryFilterImages })
            tools.fetch(RouteProduct.CategoryDelete).options({ paramId: _id })
            break
          case 'subcategory':
            const subcategoryFilterImages = state.intactData.subcategory.find(pro => pro._id === _id)?.productsId.flatMap(pro => pro.images) || []
            subcategoryFilterImages.length > 0 && imagesAdmin({ toDelete: subcategoryFilterImages })
            tools.fetch(RouteProduct.SubCategoryDelete).options({ paramId: _id })
            break
          case 'product':
            const productFilterImages = state.intactData.product.find(pro => pro._id === _id)?.images || []
            productFilterImages.length > 0 && imagesAdmin({ toDelete: productFilterImages })
            tools.fetch(RouteProduct.ProductDelete).options({ paramId: _id })
            break
          default:
            break;
        }
        return

      case ButtonName.FilterProduct:
        setState(prevState => ({ ...prevState, _id: value, }))
        return

      case ButtonName.AddSpecification:
        setState({
          ...state,
          error: { ...state.error, specification: "" },
          changeList: { ...state.changeList, product: { ...state.changeList.product, specification: [...state.changeList.product.specification, { key: '', value: '' }] } }
        })
        return;

      case ButtonName.RemoveSpecification:
        const { changeList: { product } } = state;
        const targetButton2 = event.target as HTMLElement;
        const specIndexToRemove = parseInt(targetButton2.dataset.index || '0', 10);
        const updatedSpecification = product.specification.filter((_, index) => index !== specIndexToRemove);
        setState(prevState => ({ ...prevState, changeList: { ...prevState.changeList, product: { ...prevState.changeList.product, specification: updatedSpecification } } }))
        return;

      case ButtonName.FileDelete:
        const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
        if (inputElement) inputElement.value = '';

        const { temporaryImages, changeList } = state;
        if (dataset.type === 'file') { // elimina files
          temporaryImages.get.splice(+value, 1)
          return setState({ ...state, temporaryImages })
        } else if (dataset.type === 'url') { //elimina string
          const urlDelete = changeList.product.images[+value]
          const filterImage = changeList.product.images.filter(img => img !== urlDelete)
          return setState({ ...state, temporaryImages: { ...state.temporaryImages, delete: [...state.temporaryImages.delete, urlDelete] }, changeList: { ...state.changeList, product: { ...state.changeList.product, images: filterImage } } })
        }
        return

      default:
        break;

    }
  };

  return { state, setState, isFetching, handleOnChange, findItemById, tools, status, handleOnChangeProduct, handleOnChangeTextArea, handleOnClick };
}

export default useStateProductCreation;