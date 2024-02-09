import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from "../../../../services/navigation/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
import { IProduct } from "../../../../interfaces/product.interface";
import { RouteProduct } from "../../../../services/product/productRequest";

export interface InitialStateProductCreation {
  type: 'search' | 'selected'
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
    product: Array<{
      product: string;
      product_id: string;
    }>
  } | null
  search: {
    search: string;
    entity: 'department' | 'category' | 'subcategory' | 'product';
  }
  mutation: {
    entity: 'department' | 'category' | 'subcategory' | 'product';
    // input: string;
    route: RouteProduct;
    paramId: string;
  }
}

export const initialStateProductCreation: InitialStateProductCreation = {
  type: 'search',
  filters: null,
  search: {
    search: '',
    entity: 'department'
  },
  mutation: {
    entity: 'department',
    // input: '',
    route: RouteProduct.DepartmentCreate,
    paramId: ''

  }
}


function useProductCreationQuery() {
  const [stateProductCreation, setStateProductCreation] = useState<InitialStateProductCreation>(initialStateProductCreation)
  const { search, type } = stateProductCreation
  ///////
  const { data, isLoading, isError, error, isSuccess, isFetching } = useQuery<MakeNavigationRequestReturn & { data: RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data'] }, ErrorNavigation>({
    queryKey: [IProduct.QUERY_KEY_PRODUCT.NavigationDashboard, type, search.entity, search.search],
    queryFn: async () => navigationRequest(RouteNavigation.NavigationListProductDashboard).options({
      extensionRoute: `/${search.search}/${search.entity}/${type}`
    }),
    enabled: !!search.search && !!search.entity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  }
  );
  /////

  return { setStateProductCreation, stateProductCreation, query: { data: data?.data, isLoading, isError, error, isSuccess, isFetching } };
}

export default useProductCreationQuery;