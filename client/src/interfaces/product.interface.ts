
// ==============================|| Product ||============================== //
export namespace IProduct {
  export type Routes = "request" | "registre" | "update" | "delete" | "";
  // type Roles = "super" | "admin" | "edit" | "visitant";
  interface Specification {
    [key: string]: string;
  }
  export interface Product {
    _id: string;
    subcategoryId: string;
    name: string;
    price: string;
    specification: Specification[];
    description: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  }
  export interface Subcategory {
    _id: string;
    name: string;
    productsId: Product[];
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Category {
    _id: string;
    name: string;
    subcategoriesId: Subcategory[];
    departmentId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Department {
    _id: string;
    name: string;
    categoriesId: Category[];
    createdAt: string;
    updatedAt: string;
  }

  export type ProductsData = Department[];

  export type departmentData = any;

  /////////////////////////////////
}

// ==============================|| Redux ||============================== //
export namespace IProductRedux {

  export interface InitialState {
    products: IProduct.ProductsData | null;
    product: IProduct.Product | null;
    loading: boolean;
    error: null | {} | string;
  }

  export type ProductPostsReturn = IProduct.ProductsData
  export type ProductPostsProps = { routes: IProduct.Routes };

  export type DepartmentPostsProps = IProduct.departmentData;



  // =|| Template message error ||= //
  export interface TemplateMessageReturn {
    routes: IProduct.Routes;
    method: Method;
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IProduct.Routes }) => TemplateMessageReturn



  // =|| Api ||= //
  type Method = "get" | "post" | "put" | "delete";
  export interface DepartmentApi {
    routes: IProduct.Routes;
    dataPost?: DepartmentPostsProps;
  }

  export interface ProductApi {
    routes: TemplateMessageReturn["routes"]
    method: TemplateMessageReturn["method"];
    dataPost?: DepartmentPostsProps;
  }

}