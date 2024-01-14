import { BreadcrumbType, MapEntityBreadcrumb } from "../../interfaces/global.interface";
import { IProduct } from "../../interfaces/product.interface";

export enum RouteNavigation {
  NavigationMenu = 'get|navigation/menu',
  NavigationListProduct = 'get|navigation/list-product',
  NavigationSearch = 'get|navigation/search',
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
    extensionRoute: `/${string}/${string}/${string}${string}`;
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
  }
};






