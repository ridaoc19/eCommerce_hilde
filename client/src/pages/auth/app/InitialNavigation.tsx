import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CreateContext } from "../../../hooks/useContext";
import { IMessagesReducer } from "../../../hooks/useContext/messages/reducer";
import { IProduct } from "../../../interfaces/product.interface";
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from "../../../services/navigation/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../../services/navigation/navigationRequest";

function InitialNavigation() {
  const { messages: { messagesContextDispatch }, navigation: { navigationContextDispatch } } = useContext(CreateContext)

  const { isFetching, isLoading, data, error, isSuccess, isError } =
    useQuery<MakeNavigationRequestReturn & { data: RequestMapNavigation[RouteNavigation.NavigationMenu]['data'] }, ErrorNavigation>({
      queryKey: [IProduct.QUERY_KEY_PRODUCT.Navigation],
      queryFn: async () => await navigationRequest(RouteNavigation.NavigationMenu).options({}),
      // onError: (error: ErrorNavigation) => error,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // enabled: true,
    });

  useEffect(() => {
    navigationContextDispatch({
      type: 'hierarchicalData',
      payload: {
        isLoading,
        isFetching,
        data: data?.data ? data.data : [],
        errors: error?.errors ? error.errors : []
      }
    })

    error && messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
    // eslint-disable-next-line
  }, [isFetching, isLoading, isError, isSuccess])

  return null;
}

export default InitialNavigation;