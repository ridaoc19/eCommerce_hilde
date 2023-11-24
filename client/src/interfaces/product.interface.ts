export namespace IProduct {
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
    name: string;
    brand: string;
    specification: Specification[];
    description: string;
    images: string[];
    variants: Variants[];
  }
  export interface Subcategory {
    _id: string;
    name: string;
    productsId: Product[];
    categoryId: string;
  }

  export interface Category {
    _id: string;
    name: string;
    subcategoriesId: Subcategory[];
    departmentId: string;
  }

  export interface Department {
    _id: string;
    name: string;
    categoriesId: Category[];
  }
}