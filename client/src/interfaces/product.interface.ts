
// ==============================|| Product ||============================== //
export namespace IProduct {
  type Routes = "request" | "registre" | "update" | "delete" | "";
  // type Roles = "super" | "admin" | "edit" | "visitant";
  interface Specification {
    key: string;
    value: string;
  }

  export interface ProductData {
    _id: string;
    department: string;
    category: string,
    subCategory: string;
    name: string;
    price: string;
    images: string[];
    description: string;
    specification: Specification[];
    routes: Routes;
  }

  export type departmentData = Pick<IProduct.ProductData, 'routes'>;
  export type productData = Pick<IProduct.ProductData, 'routes'>;
}

// ==============================|| Redux ||============================== //
export namespace IProductRedux {

  export interface InitialState {
    products: IProduct.ProductData | null;
    product: IProduct.ProductData | null;
    loading: boolean;
    error: null | {} | string;
  }

  export type DepartmentPostsProps = IProduct.departmentData;
  export type ProductPostsProps = IProduct.productData;

  // =|| Template message error ||= //
  export interface TemplateMessageReturn {
    routes: IProduct.ProductData["routes"];
    method: Method;
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IProduct.ProductData["routes"] }) => TemplateMessageReturn

  // =|| Api ||= //
  type Method = "get" | "post" | "put" | "delete";
  export interface DepartmentApi {
    routes: IProduct.ProductData["routes"];
    dataPost?: DepartmentPostsProps;
  }

  export interface ProductApi {
    routes: TemplateMessageReturn["routes"]
    method: TemplateMessageReturn["method"];
    dataPost?: DepartmentPostsProps;
  }

}