import { useEffect, useState } from "react";
import useMutationProduct from "../../../../hooks/useMutationProduct";
import useProductFilter, { BreadcrumbItem } from "../../../../hooks/useProductFilter";
import { IProduct } from "../../../../interfaces/product.interface";
import { RequestMap, Route } from "../../../../services/productApi";
import { HandleChangeText } from "../../../auth/login";
import { RequestMapProduct, RouteProduct } from "../../../../services/productRequest";

export enum ButtonName {
  Edit = 'edit',
  EditUpdate = 'edit_update',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel',
  FilterProduct = 'filterProduct',
  FilterOpenForm = 'filterOpenForm',
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
  // changeForm: IProduct.Variants
  temporaryImages: { get: File[], delete: string[] };
  selectedProduct: Omit<RequestMap[Route.ProductEntry], 'route'>;
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
  temporaryImages: { get: [], delete: [] },
  selectedProduct: { productId: "", requestData: { _id: "", name: "", brand: "", description: "", specification: [], images: [], variants: [] } },
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
      }));
    }
    // eslint-disable-next-line
  }, [state._id, isFetching]);



  const handleOnChange: HandleChangeText = (event) => {
    const name = event.target.name as keyof InitialState['changeList'];
    const { value } = event.target;

    // const stateChangeListValue = Object.fromEntries(Object.entries(state.changeList[name]).filter(([keys]) => keys === name))


    let isEdit = state.select[name] === 'edit'
    // let isEdit = stateChangeListValue[name] && state.changeList[name]._id
    const refilter = isEdit ? state.data : Object.entries(state.intactData).reduce((acc, [key, valueInt]) => {
      return {
        ...acc,
        [key]: key !== name ? valueInt
          : valueInt.filter((d: { name: string }) => d.name.toString().toLowerCase().includes(value.toLowerCase()))
      }
    }, {}) as InitialState['data']

    const resChangeList = Object.entries(state.changeList).reduce((acc, [key, values]) => {
      console.log(values)
      if (key === name) {
        return { ...acc, [key]: isEdit ? {...values, _id: values._id, [key]: value } : {...values, _id: "", [key]: value } }
      } else
      return { ...acc, [key]: {...values, _id: values._id, [key]: "" } }
    }, {})
    console.log(refilter ,resChangeList)
    
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

  return { state, setState, isFetching, handleOnChange, findItemById, tools, status };
}

export default useStateProductCreation;