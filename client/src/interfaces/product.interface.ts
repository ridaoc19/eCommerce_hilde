export namespace IProduct {
  export enum QUERY_KEY_PRODUCT {
    SingleProduct = 'user',
    MultipleProducts = 'products',
    Navigation = 'navigation'
  }
  type Route = "request" | "create" | "edit" | "delete" | "";
  export type Method = "get" | "post" | "put" | "delete";
  export type Routes = {
    routes: Route
  }

  type Attributes = Record<string, string>

  export interface Variant {
    variant_id: string;
    images: string[];
    attributes: Attributes;
    videos: string[];
    price: number;
    stock: number;
    product: Product;
  }

  interface Specification {
    [key: string]: string;
  }
  export interface Product {
    product_id: string;
    product: string;
    brand: string;
    description: string;
    specification: Specification;
    subcategory: Subcategory;
    variants: Variant[];
  }
  export interface Subcategory {
    subcategory_id: string;
    subcategory: string;
    category: Category;
    products: Product[];
  }

  export interface Category {
    category_id: string;
    category: string;
    department: Department;
    subcategories: Subcategory[];
  }

  export interface Department {
    department_id: string;
    department: string;
    categories: Category[];
  }
  export interface ListProduct {
    navigation_id: string;
    department: Omit<Department, 'categories'>;
    category: Omit<Category, 'department' | 'subcategories'>;
    subcategory: Omit<Subcategory, 'category' | 'products'>;
    product: Omit<Product, 'subcategory'>;
  }
}

