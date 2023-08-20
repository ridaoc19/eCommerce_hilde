
// ==============================|| Product ||============================== //
export namespace IProduct {
  type Route = "request" | "create" | "edit" | "delete" | "";
  export type Routes = {
    routes: Route
  }
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
    // createdAt?: string;
    // updatedAt?: string;
  }
  export interface Subcategory {
    _id: string;
    name: string;
    productsId: Product[];
    categoryId: string;
    // createdAt?: string;
    // updatedAt?: string;
  }

  export interface Category {
    _id: string;
    name: string;
    subcategoriesId: Subcategory[];
    departmentId: string;
    // createdAt?: string;
    // updatedAt?: string;
  }

  export interface Department {
    _id: string;
    name: string;
    categoriesId: Category[];
    // createdAt?: string;
    // updatedAt?: string;
  }


  // export type DepartmentData = any
  // export type DepartmentData = Pick<Department, '_id' | 'name' | 'routes'>

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
  // export type ProductPostsProps = IProduct.Product;
  export type ProductPostsReturn = { message: string, products: IProduct.Department[] | [] };
  
  // export type DepartmentPostsProps = IProduct.DepartmentData;
  export type DepartmentPostsReturn = { message: string, products: IProduct.Department[] };
  
  
  // =|| Template message error ||= //
  type Method = "get" | "post" | "put" | "delete";
  export interface TemplateMessageReturn {
    route: IProduct.Routes['routes'];
    method: Method;
    message: string;
  }
  export type TemplateMessageProps = (data: IProduct.Routes) => TemplateMessageReturn




























  // =|| Api ||= //
  export interface ProductApi {
    routes: TemplateMessageReturn["route"]
    method: TemplateMessageReturn["method"];
    dataPost: any;
  }

  export interface DepartmentApi {
    routes: TemplateMessageReturn["route"]
    method: TemplateMessageReturn["method"];
    dataPost: any;
  }
}