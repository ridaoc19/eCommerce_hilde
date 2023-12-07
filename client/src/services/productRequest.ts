import { IProduct } from "../interfaces/product.interface";

// switch (route) {
//   // department
//   case Route.DepartmentCreate:
//     return { route, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.DepartmentEdit:
//     return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.DepartmentDelete:
//     return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'delete', }, };
//   // category
//   case Route.CategoryCreate:
//     return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.CategoryEdit:
//     return { route: `${route}/${params.categoryId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.CategoryDelete:
//     return { route: `${route}/${params.categoryId}`, requestOptions: { method: 'delete', }, };
//   // subcategory
//   case Route.SubCategoryCreate:
//     return { route: `${route}/${params.categoryId}`, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.SubCategoryEdit:
//     return { route: `${route}/${params.subcategoryId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.SubCategoryDelete:
//     return { route: `${route}/${params.subcategoryId}`, requestOptions: { method: 'delete', }, };
//   // product
//   case Route.ProductRequest:
//     return { route: `${route}`, requestOptions: { method: 'get', }, };
//   case Route.ProductCreate:
//     return { route: `${route}/${params.subcategoryId}`, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.ProductEdit:
//     return { route: `${route}/${params.productId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
//   case Route.ProductDelete:
//     return { route: `${route}/${params.productId}`, requestOptions: { method: 'delete', }, };
//   case Route.ProductEntry:
//     // console.log(params.requestData);

//     return { route: `${route}/${params.productId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers } };
//   default:
//     return { route: 'request', requestOptions: { method: 'get' } };
// }
// };

// Enumeración para las rutas de las solicitudes
export enum RouteProduct {
  DepartmentCreate = 'post|department/create',
  DepartmentEdit = 'put|department/edit',
  DepartmentDelete = 'delete|department/delete',

  CategoryCreate = 'post|category/create',
  CategoryEdit = 'put|category/edit',
  CategoryDelete = 'delete|category/delete',

  SubCategoryCreate = 'post|subCategory/create',
  SubCategoryEdit = 'put|subCategory/edit',
  SubCategoryDelete = 'delete|subCategory/delete',

  ProductRequest = 'get|product/request',
  ProductDelete = 'delete|product/delete',
  ProductCreate = 'post|product/create',
  ProductEdit = 'put|product/edit',

  ProductEntry = 'put|product/entry',
}

// Definición de tipos para las solicitudes basadas en las rutas
export type RequestMapProduct = {
  // departamento
  [RouteProduct.DepartmentCreate]: {
    route: RouteProduct.DepartmentCreate;
    requestData: Pick<IProduct.Department, 'department'>;
  };
  [RouteProduct.DepartmentEdit]: {
    route: RouteProduct.DepartmentEdit;
    // departmentId: IProduct.Department['_id'];
    paramId: IProduct.Department['_id'];
    requestData: Pick<IProduct.Department, 'department'>;
  };
  [RouteProduct.DepartmentDelete]: {
    route: RouteProduct.DepartmentDelete;
    // departmentId: IProduct.Department['_id'];
    paramId: IProduct.Department['_id'];
  };
  // category
  [RouteProduct.CategoryCreate]: {
    route: RouteProduct.CategoryCreate;
    // departmentId: IProduct.Category['departmentId'];
    paramId: IProduct.Category['departmentId'];
    requestData: Pick<IProduct.Category, 'category'>;
  };
  [RouteProduct.CategoryEdit]: {
    route: RouteProduct.CategoryEdit;
    // categoryId: IProduct.Category['_id'];
    paramId: IProduct.Category['_id'];
    requestData: Pick<IProduct.Category, 'category'>;
  };
  [RouteProduct.CategoryDelete]: {
    route: RouteProduct.CategoryDelete;
    // categoryId: IProduct.Category['_id'];
    paramId: IProduct.Category['_id'];
  };
  // subcategory
  [RouteProduct.SubCategoryCreate]: {
    route: RouteProduct.SubCategoryCreate;
    // categoryId: IProduct.Subcategory['categoryId'];
    paramId: IProduct.Subcategory['categoryId'];
    requestData: Pick<IProduct.Subcategory, 'subcategory'>;
  };
  [RouteProduct.SubCategoryEdit]: {
    route: RouteProduct.SubCategoryEdit;
    // subcategoryId: IProduct.Subcategory['_id'];
    paramId: IProduct.Subcategory['_id'];
    requestData: Pick<IProduct.Subcategory, 'subcategory'>;
  };
  [RouteProduct.SubCategoryDelete]: {
    route: RouteProduct.SubCategoryDelete;
    // subcategoryId: IProduct.Subcategory['_id'];
    paramId: IProduct.Subcategory['_id'];
  };


  // product
  [RouteProduct.ProductRequest]: {
    route: RouteProduct.ProductRequest;
  };
  [RouteProduct.ProductCreate]: {
    route: RouteProduct.ProductCreate;
    // subcategoryId: IProduct.Product['subcategoryId'];
    paramId: IProduct.Product['subcategoryId'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId' | 'variants'>;
  };
  [RouteProduct.ProductEdit]: {
    route: RouteProduct.ProductEdit;
    // productId: IProduct.Product['_id'];
    paramId: IProduct.Product['_id'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId' | 'variants'>;
  };
  [RouteProduct.ProductDelete]: {
    route: RouteProduct.ProductDelete;
    // productId: IProduct.Product['_id'];
    paramId: IProduct.Product['_id'];
  };

  // productEntry
  [RouteProduct.ProductEntry]: {
    route: RouteProduct.ProductEntry;
    // productId: IProduct.Product['_id'];
    // paramId: IProduct.Category['_id'];
    requestData: Omit<IProduct.Product, 'subcategoryId'>
  };
};