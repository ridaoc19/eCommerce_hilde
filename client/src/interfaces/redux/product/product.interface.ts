import { IDepartment } from "../../features/dash/dash.interface";
import { IProduct } from "../../sections/product.interface";

export namespace IProductRedux {

  export interface InitialState {
    product: IProduct.ProductData | null;
    loading: boolean;
    error: null | {} | string;
  }

  export type DepartmentPostsProps = IDepartment.departmentData;


  
  export interface TemplateMessageReturn {
    routes: IProduct.ProductData["routes"];
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IProduct.ProductData["routes"] }) => TemplateMessageReturn


  export type ProductPostsProps = any;

}