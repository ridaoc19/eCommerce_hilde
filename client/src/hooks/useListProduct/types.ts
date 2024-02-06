import { Dispatch, ReactNode, SetStateAction } from "react";
import { ErrorNavigation } from "../../services/navigation/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../services/navigation/navigationRequest";

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
  setStateListProduct: Dispatch<SetStateAction<InitialStateListProduct>>
  // handleClickFilterType: (filterType: InitialStateListProduct['filterType']) => void;
  // heightContentFilter: number;
  // setHeightContentFilter: Dispatch<SetStateAction<number>>
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
  filterType: "strict" | "flexible"
  id: string;
  query: string;
  dataState: Pick<RequestMapNavigation[RouteNavigation.NavigationListProduct]['data'], 'breadcrumb' | 'filters'>
}