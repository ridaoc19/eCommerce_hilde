import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CreateContext } from "../../../hooks/useContext";
import { IMessagesReducer } from "../../../hooks/useContext/messages/reducer";
import { IAdvertising } from "../../../interfaces/advertising.interface";
import { advertisingRequest, ErrorAdvertising, MakeAdvertisingRequestReturn } from "../../../services/advertising/advertisingApi";
import { RequestMapAdvertising, RouteAdvertising } from "../../../services/advertising/advertisingRequest";

function InitialAdvertising() {
  const { messages: { messagesContextDispatch }, advertising: { advertisingContextDispatch } } = useContext(CreateContext)

  const advertising =
    useQuery<MakeAdvertisingRequestReturn & { data: RequestMapAdvertising[RouteAdvertising.AdvertisingRequest]['data'] }, ErrorAdvertising>({
      queryKey: [IAdvertising.QUERY_KEY_PRODUCT.Advertising],
      queryFn: async () => await advertisingRequest(RouteAdvertising.AdvertisingRequest).options({}),
      // onError: (error: ErrorNavigation) => error,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // enabled: true,
    });

  useEffect(() => {
    advertisingContextDispatch({
      type: 'advertisingData',
      payload: {
        isLoading: advertising.isLoading,
        isFetching: advertising.isFetching,
        data: advertising.data?.data ? advertising.data.data : { dataAdvertising: [], topViewedProducts: [] },
        errors: advertising.error?.errors ? advertising.error.errors : []
      }
    })

    advertising.error && messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: advertising.error.errors.map(e => { return { ...e, status_code: advertising.error.status_code } }) })
    // eslint-disable-next-line
  }, [advertising.isLoading, advertising.isFetching, advertising.isError, advertising.isSuccess])
  return null;
}

export default InitialAdvertising;