import { IProduct } from "../interfaces/product.interface";

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

export type RequestMapProduct = {
  [RouteProduct.DepartmentCreate]: {
    route: RouteProduct.DepartmentCreate;
    requestData: Pick<IProduct.Department, 'department'>;
  };
  [RouteProduct.DepartmentEdit]: {
    route: RouteProduct.DepartmentEdit;
    paramId: IProduct.Department['_id'];
    requestData: Pick<IProduct.Department, 'department'>;
  };
  [RouteProduct.DepartmentDelete]: {
    route: RouteProduct.DepartmentDelete;
    paramId: IProduct.Department['_id'];
  };
  [RouteProduct.CategoryCreate]: {
    route: RouteProduct.CategoryCreate;
    paramId: IProduct.Category['departmentId'];
    requestData: Pick<IProduct.Category, 'category'>;
  };
  [RouteProduct.CategoryEdit]: {
    route: RouteProduct.CategoryEdit;
    paramId: IProduct.Category['_id'];
    requestData: Pick<IProduct.Category, 'category'>;
  };
  [RouteProduct.CategoryDelete]: {
    route: RouteProduct.CategoryDelete;
    paramId: IProduct.Category['_id'];
  };
  [RouteProduct.SubCategoryCreate]: {
    route: RouteProduct.SubCategoryCreate;
    paramId: IProduct.Subcategory['categoryId'];
    requestData: Pick<IProduct.Subcategory, 'subcategory'>;
  };
  [RouteProduct.SubCategoryEdit]: {
    route: RouteProduct.SubCategoryEdit;
    paramId: IProduct.Subcategory['_id'];
    requestData: Pick<IProduct.Subcategory, 'subcategory'>;
  };
  [RouteProduct.SubCategoryDelete]: {
    route: RouteProduct.SubCategoryDelete;
    paramId: IProduct.Subcategory['_id'];
  };


  [RouteProduct.ProductRequest]: {
    route: RouteProduct.ProductRequest;
  };
  [RouteProduct.ProductCreate]: {
    route: RouteProduct.ProductCreate;
    paramId: IProduct.Product['subcategoryId'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId' | 'variants'>;
  };
  [RouteProduct.ProductEdit]: {
    route: RouteProduct.ProductEdit;
    paramId: IProduct.Product['_id'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId' | 'variants'>;
  };
  [RouteProduct.ProductDelete]: {
    route: RouteProduct.ProductDelete;
    paramId: IProduct.Product['_id'];
  };

  [RouteProduct.ProductEntry]: {
    route: RouteProduct.ProductEntry;
    requestData: Omit<IProduct.Product, 'subcategoryId'>
  };
};