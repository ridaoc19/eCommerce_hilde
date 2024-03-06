import { BreadcrumbType, MapEntityBreadcrumb } from "../../interfaces/global.interface";
import { IProduct } from "../../interfaces/product.interface";

export enum RouteNavigation {
  NavigationMenu = 'get|navigation/menu',
  NavigationListProduct = 'get|navigation/list-product',
  NavigationSearch = 'get|navigation/search',
  NavigationListProductDashboard = 'get|navigation/list-product-dashboard',
}

export type RequestMapNavigation = {
  [RouteNavigation.NavigationMenu]: {
    route: RouteNavigation.NavigationMenu;
    data: (Omit<IProduct.Department, 'categories'> & {
      categories: (Omit<IProduct.Category, 'subcategories' | 'department'> & {
        subcategories: (Omit<IProduct.Subcategory, 'products' | 'category'> & {
          products: Pick<IProduct.Product, 'product_id' | 'product'>[]
        })[]
      })[]
    })[]

  },
  [RouteNavigation.NavigationListProduct]: {
    route: RouteNavigation.NavigationListProduct;
    extensionRoute: `/${string}/${string}/${string}/${string}${string}`;
    data: {
      breadcrumb: MapEntityBreadcrumb[BreadcrumbType];
      listProduct: IProduct.ListProduct[];
      filters: {
        department: string[]
        category: string[]
        subcategory: string[]
        brand: string[]
        attributes: {
          [key: string]: string[];
        }
        specifications: {
          [key: string]: string[];
        }
      }
      totalCount: number;
    }
  },
  [RouteNavigation.NavigationSearch]: {
    route: RouteNavigation.NavigationSearch;
    extensionRoute: `/${string}`;
    data: {
      listProduct: (IProduct.ListProduct & { breadcrumb: MapEntityBreadcrumb[BreadcrumbType] })[];
      totalCount: number;
    }
  },
  [RouteNavigation.NavigationListProductDashboard]: {
    route: RouteNavigation.NavigationListProductDashboard;
    extensionRoute: `/${string}/${string}/${string}`;
    data: {
      breadcrumb: MapEntityBreadcrumb[BreadcrumbType] | null;
      listProduct: IProduct.ListProduct[] | null;
      filters: {
        department: Array<{
          department: string;
          department_id: string;
        }>
        category: Array<{
          category: string;
          category_id: string;
        }>
        subcategory: Array<{
          subcategory: string;
          subcategory_id: string;
        }>
        product: IProduct.Product[]
        variant: Array<{
          variant: string;
          variant_id: string;
        }>
      }
      totalCount: number | null;
    }
  },
};



