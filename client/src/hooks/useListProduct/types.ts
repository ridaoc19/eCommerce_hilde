import { ReactNode } from "react";
import { ErrorNavigation } from "../../services/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../services/navigationRequest";

export interface ListProductHook {
  listProducts: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['listProduct'];
  currentIndex: number;
  isLoading: boolean;
  error: ErrorNavigation | null
  isError: boolean;
  BreadcrumbComponent: ReactNode;
  PaginationButton: ReactNode;
  Filters: ReactNode;
  paginationTotal: number;
  totalProduct: number;
}

interface AllProducts {
  allProducts_id: number;
  allProducts_data: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['listProduct']
}

export interface InitialStateListProduct {
  allProducts: AllProducts[];
  paginationTotal: number,
  pagination: number,
  currentIndex: number,
  id: string;
  query: string;
  dataState: Pick<RequestMapNavigation[RouteNavigation.NavigationListProduct]['data'], 'breadcrumb' | 'filters'>
}