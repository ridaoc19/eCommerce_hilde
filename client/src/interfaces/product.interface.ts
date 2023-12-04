export namespace IProduct {
  export enum QUERY_KEY_PRODUCT {
    SingleProduct = 'user',
    MultipleProducts = 'products'
  }
  type Route = "request" | "create" | "edit" | "delete" | "";
  export type Method = "get" | "post" | "put" | "delete";
  export type Routes = {
    routes: Route
  }
  export const PRODUCT_NAME_QUERY = ['products']

  export interface Variants {
    _id?: string;
    size: string;
    color: string;
    purchasePrice: number;
    sellingPrice: number;
    stock: number;
  }

  interface Specification {
    [key: string]: string;
  }
  export interface Product {
    _id: string;
    subcategoryId: string;
    product: string;
    brand: string;
    specification: Specification[];
    description: string;
    images: string[];
    variants: Variants[];
  }
  export interface Subcategory {
    _id: string;
    subcategory: string;
    productsId: Product[];
    categoryId: string;
  }

  export interface Category {
    _id: string;
    category: string;
    subcategoriesId: Subcategory[];
    departmentId: string;
  }

  export interface Department {
    _id: string;
    department: string;
    categoriesId: Category[];
  }
}