export namespace IProduct {
  export enum QUERY_KEY_PRODUCT {
    SingleProduct = 'user',
    MultipleProducts = 'products',
    Navigation = 'navigation',
    NavigationDashboard = 'navigationDashboard'
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
    listPrice: number;
    stock: number;
    product: Product;
  }

  interface Specifications {
    [key: string]: string;
  }
  export interface Product {
    product_id: string;
    product: string;
    brand: string;
    description: string;
    specifications: Specifications;
    benefits: string[];
    contents: string;
    warranty: string;
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
    product: Omit<Product, 'subcategory' | 'variants'>;
    variants: Omit<Variant, 'product'>[]
  }
}


export function isDepartment(item: IProduct.Variant | IProduct.Department | IProduct.Category | IProduct.Subcategory | IProduct.Product): item is IProduct.Department {
  return (item as IProduct.Department).categories !== undefined;
}

export function isCategory(item: IProduct.Variant | IProduct.Department | IProduct.Category | IProduct.Subcategory | IProduct.Product): item is IProduct.Category {
  return (item as IProduct.Category).subcategories !== undefined;
}

export function isSubcategory(item: IProduct.Variant | IProduct.Department | IProduct.Category | IProduct.Subcategory | IProduct.Product): item is IProduct.Subcategory {
  return (item as IProduct.Subcategory).products !== undefined;
}

export function isProduct(item: IProduct.Variant | IProduct.Department | IProduct.Category | IProduct.Subcategory | IProduct.Product): item is IProduct.Product {
  return (item as IProduct.Product).variants !== undefined;
}

export function isVariant(item: IProduct.Variant | IProduct.Department | IProduct.Category | IProduct.Subcategory | IProduct.Product): item is IProduct.Variant {
  return (item as IProduct.Variant).images !== undefined;
}

