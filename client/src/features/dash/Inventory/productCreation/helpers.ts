import { BreadcrumbItem } from "../../../../hooks/useProductFilter";
import { IProduct } from "../../../../interfaces/product.interface";
import { RequestMapProduct, RouteProduct } from "../../../../services/productRequest";
import { InitialStateEntry } from "../productEntry/helpers";

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
    specification: string,
    specificationKey: string,
    specificationValue: string,
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
    specification: "",
    specificationKey: "",
    specificationValue: ""
  },
  temporaryImages: { get: [], delete: [] },
}


type FilterData = (data: { isEdit: boolean, data: InitialState['data'], intactData: InitialState['intactData'], name: keyof InitialState['changeList'], value: string }) => { filterDataResponse: InitialState['data'] }
export const filterData: FilterData = ({ isEdit, name, data, intactData, value }) => {
  if (isEdit) return { filterDataResponse: data }
  return {
    filterDataResponse: Object.entries(intactData).reduce((acc, [key, valueInt]) => {
      return {
        ...acc,
        [key]: key !== name ? valueInt
          : valueInt.filter((d: Record<keyof InitialState['changeList'], string>) => d[name].toString().toLowerCase().includes(value.toLowerCase()))
      }
    }, {}) as InitialState['data']
  }
}

type UpdateChangeList = (data: { isEdit: boolean, state: InitialState, name: keyof InitialState['changeList'], value: string }) => { updateChangeListResponse: InitialState['changeList'] }
export const updateChangeList: UpdateChangeList = ({ isEdit, state, name, value }) => {
  return {
    updateChangeListResponse: Object.entries(state.changeList).reduce((acc, [key, values]) => {
      if (key === name) {
        return { ...acc, [key]: isEdit ? { ...values, _id: values._id, [key]: value } : { ...values, _id: "", [key]: value } }
      } else
        return { ...acc, [key]: { ...values, _id: values._id, [key]: "" } }
    }, {}) as InitialState['changeList']
  }
}


type UpdateChangeListEntry = (data: { isEdit: boolean, state: InitialStateEntry, name: keyof InitialState['changeList'], value: string }) => { updateChangeListEntryResponse: InitialStateEntry['changeList'] }
export const updateChangeListEntry: UpdateChangeListEntry = ({ isEdit, state, name, value }) => {
  return {
    updateChangeListEntryResponse: Object.entries(state.changeList).reduce((acc, [key, values]) => {
      if (key === name) {
        return { ...acc, [key]: isEdit ? { ...values, _id: values._id, [key]: value } : { ...values, _id: "", [key]: value } }
      } else
        return { ...acc, [key]: { ...values, _id: values._id, [key]: "" } }
    }, {}) as InitialStateEntry['changeList']
  }
}

type UpdateSelect = (data: { isEdit: boolean, state: InitialState, name: keyof InitialState['changeList'], filterData: InitialState['data'] }) => { updateSelectResponse: InitialState['select'] }
export const updateSelect: UpdateSelect = ({ isEdit, state, name, filterData }) => {
  return {
    updateSelectResponse: Object.entries(state.select).reduce((acc, [key, values]) => {
      const updateCreate = state.select[name] !== 'edit' && filterData[name].length === 0 && isPreviousElementFilled({ name, state })
      if (key === name) {
        return { ...acc, [key]: isEdit ? values : updateCreate ? 'create' : "" }
      } else
        return { ...acc, [key]: "" }
    }, {}) as InitialState['select']
  }
}

export const isPreviousElementFilled = (({ name, state }: { name: keyof InitialState['changeList'], state: InitialState }) => {
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
