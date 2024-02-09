import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAdvertising } from "../interfaces/advertising.interface";
import { advertisingRequest, ErrorAdvertising } from "../services/advertising/advertisingApi";
import { RequestMapAdvertising, RouteAdvertising } from "../services/advertising/advertisingRequest";
import { useContext } from "react";
import { CreateContext } from "./useContext";


function useMutationAdvertising() {
  const queryClient = useQueryClient();
  const { error: { errorContextDispatch } } = useContext(CreateContext)!

  const { mutate: getMutate, reset, error, isPending, isSuccess, isError, status } = useMutation({
    mutationFn: ({ route, options }: { route: RouteAdvertising, options: Omit<RequestMapAdvertising[RouteAdvertising], 'route' | 'data'> }) => {
      return advertisingRequest(route).options(options)
    },
    onError(error: ErrorAdvertising) {
      errorContextDispatch({ type: 'errors', payload: error.errors })
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
