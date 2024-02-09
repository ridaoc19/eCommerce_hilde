import { RequestMapProduct, RouteProduct } from "../../../../services/product/productRequest";

export const initialStateForm: RequestMapProduct = {
  "get|department/request": {
    route: RouteProduct.DepartmentRequest,
    data: []
  },
  "post|department/create": {
    route: RouteProduct.DepartmentCreate,
    requestData: {
      department: ''
    }
  },
  "put|department/edit": {
    route: RouteProduct.DepartmentEdit,
    requestData: {
      department: ''
    },
    paramId: ''
  },
  "delete|department/delete": {
    route: RouteProduct.DepartmentDelete,
    paramId: '',
  },
  "post|category/create": {
    route: RouteProduct.CategoryCreate,
    requestData: {
      category: ''
    },
    paramId: ''
  },
  "put|category/edit": {
    route: RouteProduct.CategoryEdit,
    requestData: {
      category: ''
    },
    paramId: ''
  },
  "delete|category/delete": {
    route: RouteProduct.CategoryDelete,
    paramId: ''
  },
  "post|subCategory/create": {
    route: RouteProduct.SubCategoryCreate,
    requestData: {
      subcategory: '',
    },
    paramId: ''
  },
  "put|subCategory/edit": {
    route: RouteProduct.SubCategoryEdit,
    requestData: {
      subcategory: ''
    },
    paramId: ''
  },
  "delete|subCategory/delete": {
    route: RouteProduct.SubCategoryDelete,
    paramId: ''
  },
  "post|product/create": {
    route: RouteProduct.ProductCreate,
    requestData: {
      product: '',
      brand: '',
      description: '',
      warranty: '',
      contents: '',
      specifications: {},
      benefits: []
    },
    paramId: ''
  },
  "put|product/edit": {
    route: RouteProduct.ProductEdit,
    requestData: {
      product: '',
      brand: '',
      description: '',
      warranty: '',
      contents: '',
      specifications: {},
      benefits: [],
    },
    paramId: ''
  },
  "delete|product/delete": {
    route: RouteProduct.ProductDelete,
    paramId: ''
  }

}