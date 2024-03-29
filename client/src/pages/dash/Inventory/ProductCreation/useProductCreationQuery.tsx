import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from "../../../../services/navigation/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
import { IProduct } from "../../../../interfaces/product.interface";
import { RouteProduct } from "../../../../services/product/productRequest";
import { CreateContext } from "../../../../hooks/useContext";
import Breadcrumb from "../../../../components/common/breadcrumb/Breadcrumb";
import { BreadcrumbType } from "../../../../interfaces/global.interface";
import { IErrorReducer } from "../../../../hooks/useContext/error/reducer";

export interface InitialStateProductCreation {
  query: {
    type: 'search' | 'selected'
    search: string;
    entity: keyof RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data']['filters']

  }
  mutation: {
    entity: keyof RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data']['filters'] | ''
    route: RouteProduct;
    paramId: string;
  }
}

export const initialStateProductCreation: InitialStateProductCreation = {
  query: {
    type: 'search',
    search: '',
    entity: 'department'
  },
  mutation: {
    entity: '',
    route: RouteProduct.DepartmentCreate,
    paramId: ''
  }
}

function useProductCreationQuery() {
  const { error: { errorContextDispatch } } = useContext(CreateContext)!
  const [stateProductCreation, setStateProductCreation] = useState<InitialStateProductCreation>(initialStateProductCreation)
  const { query: { type, search, entity } } = stateProductCreation
  ///////
  const { data, isLoading, isError, error, isSuccess, isFetching } = useQuery<MakeNavigationRequestReturn & { data: RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data'] }, ErrorNavigation>({
    queryKey: [IProduct.QUERY_KEY_PRODUCT.NavigationDashboard, type, entity, search],
    queryFn: async () => navigationRequest(RouteNavigation.NavigationListProductDashboard).options({
      extensionRoute: `/${search}/${entity}/${type}`
    }),
    enabled: !!search && !!entity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  }
  );
  /////
  useEffect(() => {
    setStateProductCreation(prevState => ({ ...prevState, mutation: { ...prevState.mutation, entity: '' } }))
  }, [search])

  useEffect(() => {
    error?.errors && error.errors.length > 0 && errorContextDispatch({ type: IErrorReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
    // eslint-disable-next-line
  }, [error])

  return {
    query: { data: data?.data, isLoading, isError, error, isSuccess, isFetching },
    Breadcrumb: <Breadcrumb redirect={false} viewHome={false} breadcrumb={data?.data.breadcrumb || { data: [], entity: BreadcrumbType.Department }} />,
    setStateProductCreation,
    stateProductCreation,
  };
}

export default useProductCreationQuery;