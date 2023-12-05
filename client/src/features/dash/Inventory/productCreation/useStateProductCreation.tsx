import { useEffect, useState } from "react";
import useMutationProduct from "../../../../hooks/useMutationProduct";
import useProductFilter, { BreadcrumbItem } from "../../../../hooks/useProductFilter";
import { HandleChangeText, HandleChangeTextArea } from "../../../../interfaces/global.interface";
import { IProduct } from "../../../../interfaces/product.interface";
import { RequestMapProduct, RouteProduct } from "../../../../services/productRequest";

export enum ButtonName {
  Edit = 'edit',
  EditUpdate = 'edit_update',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  // Add = 'add',
  // Confirm = 'confirm',
  // Cancel = 'cancel',
  FilterProduct = 'filterProduct',
  // FilterOpenForm = 'filterOpenForm',
  RemoveSpecification = 'removeSpecification',
  AddSpecification = 'addSpecification',
  FileDelete = 'fileDelete'
}

export interface NestedData {
  department: IProduct.Department[]
  category: IProduct.Category[]
  subcategory: IProduct.Subcategory[]
  product: IProduct.Product[]
}

export interface InitialState {
  _id: string;
  select: {
    department: "create" | 'edit' | "delete" | ""
    category: "create" | 'edit' | "delete" | ""
    subcategory: "create" | 'edit' | "delete" | ""
    product: "create" | 'edit' | "delete" | ""
  }
  intactData: NestedData;
  data: NestedData;
  breadcrumb: BreadcrumbItem[];
  changeList: {
    department: { department: string, _id: string }
    category: { category: string, _id: string }
    subcategory: { subcategory: string, _id: string }
    product: Omit<RequestMapProduct[RouteProduct.ProductCreate]['requestData'], 'name'> & { product: string, _id: string }
    // product: { product: string, _id: string }
  }
  error: {
    department: string,
    category: string,
    subcategory: string,
    product: string,
    brand: string,
    description: string,
    images: string,
    specification: string
  }
  // changeForm: IProduct.Variants
  temporaryImages: { get: File[], delete: string[] };
  // selectedProduct: Omit<RequestMap[Route.ProductEntry], 'route'>;
}

export const initialState: InitialState = {
  _id: "",
  select: {
    department: "",
    category: "",
    subcategory: "",
    product: "",
  },
  intactData: {
    department: [],
    category: [],
    subcategory: [],
    product: [],
  },
  data: {
    department: [],
    category: [],
    subcategory: [],
    product: [],
  },
  breadcrumb: [],
  changeList: {
    department: { _id: "", department: "" },
    category: { _id: "", category: "" },
    subcategory: { _id: "", subcategory: "" },
    product: { _id: "", product: "", brand: "", description: "", images: [], specification: [] }
  },
  error: {
    department: "",
    category: "",
    subcategory: "",
    product: "",
    brand: "",
    description: "",
    images: "",
    specification: ""
  },
  temporaryImages: { get: [], delete: [] },
}

function useStateProductCreation() {
  const { tools, status } = useMutationProduct();
  const { findItemById, isFetching } = useProductFilter();
  const [state, setState] = useState(initialState);
  // const [stateProductCreation, setStateProductCreation] = useState(initialState);

  useEffect(() => {
    if (!isFetching) {
      const res = findItemById({ id: state._id });
      const updateData = { ...state.data, department: res.department.data, category: res.category.data, subcategory: res.subcategory.data, product: res.product.data };

      setState(prevState => ({
        ...prevState,
        breadcrumb: res.breadcrumb,
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
    // eslint-disable-next-line
  }, [state._id, isFetching]);



  const handleOnChange: HandleChangeText = (event) => {
    const name = event.target.name as keyof InitialState['changeList'];
    const { value } = event.target;
    tools.resetError()

    // const stateChangeListValue = Object.fromEntries(Object.entries(state.changeList[name]).filter(([keys]) => keys === name))


    let isEdit = state.select[name] === 'edit'
    // let isEdit = stateChangeListValue[name] && state.changeList[name]._id
    const refilter = isEdit ? state.data : Object.entries(state.intactData).reduce((acc, [key, valueInt]) => {
      return {
        ...acc,
        [key]: key !== name ? valueInt
          : valueInt.filter((d: Record<keyof InitialState['changeList'], string>) => d[name].toString().toLowerCase().includes(value.toLowerCase()))
      }
    }, {}) as InitialState['data']

    const resChangeList = Object.entries(state.changeList).reduce((acc, [key, values]) => {
      if (key === name) {
        return { ...acc, [key]: isEdit ? { ...values, _id: values._id, [key]: value } : { ...values, _id: "", [key]: value } }
      } else
        return { ...acc, [key]: { ...values, _id: values._id, [key]: "" } }
    }, {})

    const resSelect = Object.entries(state.select).reduce((acc, [key, values]) => {
      const isPreviousElementFilled = (() => {
        switch (name) {
          case 'category':
            return state.changeList.department._id !== '';
          case 'subcategory':
            return state.changeList.category._id !== '';
          case 'product':
            return state.changeList.subcategory._id !== '';
          default:
            return true; // Para 'department' y otros casos no especificados
        }
      })

      const updateCreate = state.select[name] !== 'edit' && refilter[name].length === 0 && isPreviousElementFilled()
      if (key === name) {
        return { ...acc, [key]: isEdit ? values : updateCreate ? 'create' : "" }
        // return { ...acc, [key]: updateCreate ? 'create' :  state.select[name] === 'edit' ? value: "" }
      } else
        return { ...acc, [key]: "" }
    }, {})

    setState((prevState) => ({
      ...prevState,
      data: refilter,
      changeList: resChangeList as InitialState['changeList'],
      select: resSelect as InitialState['select']
    }));

  };


  const handleOnChangeProduct: HandleChangeText = (event) => {
    const { name, value, files } = event.target;
    tools.resetError()
    // const { name, value, files } = event.target;
    // const { stop, error } = responseError;

    // if (name === 'images' && files) {

    if (files && files.length > 0) {
      // const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
      const fileList = Array.from(files) as File[];
      // const totalImages = fileList.length + state.temporaryImages.get.length
      setState(prevState => ({ ...prevState, temporaryImages: { ...prevState.temporaryImages, get: [...state.temporaryImages.get, ...fileList] } }))

      // if (totalImages > 3) {
      //   if (inputElement) inputElement.value = '';
      //   return {
      //     ...state,
      //     validationError: { ...state.validationError, images: 'No puedes subir más de tres imágenes' }
      //   }
      // } else {

      // setState(prevState=>({
      // ...prevState,

      // validationError: { ...state.validationError, images: '' },
      // temporaryImages: { ...state.temporaryImages, get: [...state.temporaryImages.get, ...fileList] }))
      // }
      // }
    }

    // }
    else if (name === 'specificationKey' || name === 'specificationValue') {
      const specIndex = parseInt(event.target.dataset.index || '0', 10);
      const specField = name === 'specificationKey' ? 'key' : 'value';
      const updatedSpecification = [...state.changeList.product.specification];
      updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: value };

      setState(prevState => ({
        ...prevState, changeList: {
          ...prevState.changeList, product:
            { ...prevState.changeList.product, specification: updatedSpecification }
        }
      }))
      //   const newValidationError = { ...state.validationError, [name]: error };
      //   return {
      //     ...state,
      //     selectedProduct: stop
      //       ? { ...state.selectedProduct }
      //       : { ...state.selectedProduct, requestData: { ...state.selectedProduct.requestData, specification: updatedSpecification } },
      //     validationError: newValidationError
      //   }
    }
    else {
      setState(prevState => ({
        ...prevState, changeList: {
          ...prevState.changeList, product:
            { ...prevState.changeList.product, [name]: value }
        }
      }))
      //   const newValidationError = { ...state.validationError, [name]: error };
      //   return {
      //     ...state,
      //     selectedProduct: stop
      //       ? { ...state.selectedProduct }
      //       : { ...state.selectedProduct, requestData: { ...state.selectedProduct.requestData, [name]: value } },
      //     validationError: newValidationError
      // }
    }
    // return state;


  }

  const handleOnChangeTextArea: HandleChangeTextArea = (event) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState, changeList: {
        ...prevState.changeList, product:
          { ...prevState.changeList.product, [name]: value }
      }
    }))
  }

  return { state, setState, isFetching, handleOnChange, findItemById, tools, status, handleOnChangeProduct, handleOnChangeTextArea };
}

export default useStateProductCreation;