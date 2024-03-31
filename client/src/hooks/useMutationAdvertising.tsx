import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { IAdvertising } from "../interfaces/advertising.interface";
import { advertisingRequest, ErrorAdvertising } from "../services/advertising/advertisingApi";
import { RequestMapAdvertising, RouteAdvertising } from "../services/advertising/advertisingRequest";
import { CreateContext } from "./useContext";
import { IMessagesReducer } from "./useContext/messages/reducer";


function useMutationAdvertising() {
  const queryClient = useQueryClient();
  const { messages: { messagesContextDispatch } } = useContext(CreateContext)!

  const { mutate: getMutate, reset, error, isPending, isSuccess, isError, status } = useMutation({
    mutationFn: ({ route, options }: { route: RouteAdvertising, options: Omit<RequestMapAdvertising[RouteAdvertising], 'route' | 'data'> }) => {
      return advertisingRequest(route).options(options)
    },
    onError(error: ErrorAdvertising) {
      messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
      return error
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [IAdvertising.QUERY_KEY_PRODUCT.Advertising] });
    },
  });

  // function mutate<T extends RouteAdvertising>({ route, options }: { route: T, options: Omit<RequestMapAdvertising[T], 'route' | 'data'> }) {
  //   getMutate({ route, options })
  // }

  const tools = {
    mutate<T extends RouteAdvertising>({ route, options }: { route: T, options: Omit<RequestMapAdvertising[T], 'route' | 'data'> }) {
      getMutate({ route, options })
    },
    removeQueries() {
      queryClient.removeQueries({ queryKey: [IAdvertising.QUERY_KEY_PRODUCT.Advertising] });
    },
    resetError() {
      reset();
    },
  }



  return { isLoading: isPending, error, isSuccess, isError, status, tools };
}
export default useMutationAdvertising;
