import { IProduct } from "../../interfaces/product.interface";

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

  ProductDelete = 'delete|product/delete',
  ProductCreate = 'post|product/create',
  ProductEdit = 'put|product/edit',
}

export type RequestMapProduct = {
  [RouteProduct.DepartmentCreate]: {
    route: RouteProduct.DepartmentCreate;
    requestData: Pick<IProduct.Department, 'department'>;
  };
  [RouteProduct.DepartmentEdit]: {
    route: RouteProduct.DepartmentEdit;
    paramId: IProduct.Department['department_id'];
    requestData: Pick<IProduct.Department, 'department'>;
  };
  [RouteProduct.DepartmentDelete]: {
    route: RouteProduct.DepartmentDelete;
    paramId: IProduct.Department['department_id'];
  };
  [RouteProduct.CategoryCreate]: {
    route: RouteProduct.CategoryCreate;
    paramId: IProduct.Department['department_id'];
    requestData: Pick<IProduct.Category, 'category'>;
  };
  [RouteProduct.CategoryEdit]: {
    route: RouteProduct.CategoryEdit;
    paramId: IProduct.Category['category_id'];
    requestData: Pick<IProduct.Category, 'category'>;
  };
  [RouteProduct.CategoryDelete]: {
    route: RouteProduct.CategoryDelete;
    paramId: IProduct.Category['category_id'];
  };
  [RouteProduct.SubCategoryCreate]: {
    route: RouteProduct.SubCategoryCreate;
    paramId: IProduct.Category['category_id'];
    requestData: Pick<IProduct.Subcategory, 'subcategory'>;
  };
  [RouteProduct.SubCategoryEdit]: {
    route: RouteProduct.SubCategoryEdit;
    paramId: IProduct.Subcategory['subcategory_id'];
    requestData: Pick<IProduct.Subcategory, 'subcategory'>;
  };
  [RouteProduct.SubCategoryDelete]: {
    route: RouteProduct.SubCategoryDelete;
    paramId: IProduct.Subcategory['subcategory_id'];
  };


  [RouteProduct.ProductCreate]: {
    route: RouteProduct.ProductCreate;
    paramId: IProduct.Subcategory['subcategory_id'];
    requestData: Omit<IProduct.Product, 'product_id' | 'variants' | 'subcategory'>;
  };
  [RouteProduct.ProductEdit]: {
    route: RouteProduct.ProductEdit;
    paramId: IProduct.Product['product_id'];
    requestData: Omit<IProduct.Product, 'product_id' | 'variants' | 'subcategory'>;
  };
  [RouteProduct.ProductDelete]: {
    route: RouteProduct.ProductDelete;
    paramId: IProduct.Product['product_id'];
  };

};