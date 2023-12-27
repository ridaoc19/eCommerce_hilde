import { IProduct } from "../interfaces/product.interface";

export enum RouteNavigation {
  NavigationRequest = 'get|navigation/request',
}

export type RequestMapNavigation = {
  [RouteNavigation.NavigationRequest]: {
    route: RouteNavigation.NavigationRequest;
    data: (Omit<IProduct.Department, 'categories'> & {
      categories: (Omit<IProduct.Category, 'subcategories' | 'department'> & {
        subcategories: (Omit<IProduct.Subcategory, 'products' | 'category'> & {
          products: Pick<IProduct.Product, 'product_id' | 'product'>[]
        })[]
      })[]
    })[]

  };
};