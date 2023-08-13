
// ==============================|| Product ||============================== //
export namespace IProduct {
  type Routes = "registre" | "login" | "token" | "change" | "reset" | "account" | "";
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
    routes: Routes
  }

  export type departmentData = Pick<IProduct.ProductData, 'routes'>;
}

// ==============================|| Redux ||============================== //
export namespace IProductRedux {

  export interface InitialState {
    product: IProduct.ProductData | null;
    loading: boolean;
    error: null | {} | string;
  }

  export type DepartmentPostsProps = IProduct.departmentData;
  export type ProductPostsProps = any;

  // =|| Template message error ||= //
  export interface TemplateMessageReturn {
    routes: IProduct.ProductData["routes"];
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IProduct.ProductData["routes"] }) => TemplateMessageReturn

  // =|| Api ||= //
  export interface DepartmentApi {
    routes: IProduct.ProductData["routes"];
    dataPost?: DepartmentPostsProps;
  }

}