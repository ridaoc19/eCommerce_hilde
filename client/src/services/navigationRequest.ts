import { BreadcrumbType, MapEntityBreadcrumb } from "../interfaces/global.interface";
import { IProduct } from "../interfaces/product.interface";

export enum RouteNavigation {
  NavigationMenu = 'get|navigation/menu',
  NavigationListProduct = 'get|navigation/list-product',
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
    extensionRoute: `?id=${string}&skip=${string}&take=${string}`;
    data: {
      breadcrumb: MapEntityBreadcrumb[BreadcrumbType];
      listProduct: IProduct.ListProduct[];
      totalCount: number;
    }
  }
};

