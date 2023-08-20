
// ==============================|| Product ||============================== //
export namespace IProduct {
  export type Routes = "request" | "create" | "edit" | "delete" | "";
  export interface Routeable {
    routes: Routes;
  }

  // type Roles = "super" | "admin" | "edit" | "visitant";
  interface Specification {
    [key: string]: string;
  }
  export interface Product extends Routeable {
    _id: string;
    subcategoryId: string;
    name: string;
    price: string;
    specification: Specification[];
    description: string;
    images: string[];
    // createdAt?: string;
    // updatedAt?: string;
  }
  export interface Subcategory extends Routeable {
    _id: string;
    name: string;
    productsId: Product[];
    categoryId: string;
    // createdAt?: string;
    // updatedAt?: string;
  }

  export interface Category extends Routeable {
    _id: string;
    name: string;
    subcategoriesId: Subcategory[];
    departmentId: string;
    // createdAt?: string;
    // updatedAt?: string;
  }

  export interface Department extends Routeable {
    _id: string;
    name: string;
    categoriesId: Category[];
    // createdAt?: string;
    // updatedAt?: string;
  }


  // export type DepartmentData = any
  export type DepartmentData = Pick<Department, '_id' | 'name' | 'routes'>

  /////////////////////////////////
}

// ==============================|| Redux ||============================== //
export namespace IProductRedux {

  export interface InitialState {
    products: ProductPostsReturn; // ProductPostsReturn
    product: IProduct.Product | {};
    loading: boolean;
    error: null | {} | string;
  }


  // createAsyncThunk
  export type ProductPostsProps = IProduct.Product;
  export type ProductPostsReturn = { message: string, products: IProduct.Department[] | [] };

  export type DepartmentPostsProps = IProduct.DepartmentData;
  export type DepartmentPostsReturn = { message: string, products: IProduct.Department[] };



  // =|| Template message error ||= //
  export interface TemplateMessageReturn {
    routes: IProduct.Routes;
    method: Method;
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IProduct.Routes }) => TemplateMessageReturn



  // =|| Api ||= //
  type Method = "get" | "post" | "put" | "delete";
  export interface ProductApi {
    routes: TemplateMessageReturn["routes"]
    method: TemplateMessageReturn["method"];
    dataPost: ProductPostsProps;
  }

  export interface DepartmentApi {
    routes: TemplateMessageReturn["routes"]
    method: TemplateMessageReturn["method"];
    dataPost: DepartmentPostsProps;
  }
}