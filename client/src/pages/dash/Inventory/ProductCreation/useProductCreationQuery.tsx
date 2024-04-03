import { useQuery } from "@tanstack/react-query";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import Breadcrumb from "../../../../components/common/breadcrumb/Breadcrumb";
import { CreateContext } from "../../../../hooks/useContext";
import { IMessagesReducer } from "../../../../hooks/useContext/messages/reducer";
import { BreadcrumbType } from "../../../../interfaces/global.interface";
import { IProduct } from "../../../../interfaces/product.interface";
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from "../../../../services/navigation/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
import { RouteProduct } from "../../../../services/product/productRequest";

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

export interface UseProductCreationQueryReturn {
  query: {
    data: RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data'] | undefined
    isLoading: boolean
    isError: boolean
    error: ErrorNavigation | null
    isSuccess: boolean
    isFetching: boolean
  },
  Breadcrumb: ReactNode,
  setStateProductCreation: Dispatch<SetStateAction<InitialStateProductCreation>>,
  stateProductCreation: InitialStateProductCreation
}

function useProductCreationQuery(): UseProductCreationQueryReturn {
  const { messages: { messagesContextDispatch } } = useContext(CreateContext)
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
    error?.errors && error.errors.length > 0 && messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
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