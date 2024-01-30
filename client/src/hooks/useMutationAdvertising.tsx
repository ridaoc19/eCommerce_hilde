import { useMutation, useQueryClient } from "react-query";
import { IAdvertising } from "../interfaces/advertising.interface";
import { advertisingRequest } from "../services/advertising/advertisingApi";
import { RequestMapAdvertising, RouteAdvertising } from "../services/advertising/advertisingRequest";


function useMutationAdvertising() {
  const queryClient = useQueryClient();

  const { mutate: getMutate, reset, isLoading, error, isSuccess, isError, variables } = useMutation({
    mutationFn: ({ route, options }: { route: RouteAdvertising, options: Omit<RequestMapAdvertising[RouteAdvertising], 'route' | 'data'> }) => {
      return advertisingRequest(route).options(options)
    },
    // mutationFn: function <T extends RouteAdvertising>({ route, options }: { route: T, options: Omit<RequestMapAdvertising[T], 'route' | 'data'> }) {
    //   return advertisingRequest(route).options(options)
    // },
    onSuccess() {

      queryClient.invalidateQueries([IAdvertising.QUERY_KEY_PRODUCT.Advertising])
    },
  });

  function mutate<T extends RouteAdvertising>({ route, options }: { route: T, options: Omit<RequestMapAdvertising[T], 'route' | 'data'> }) {
    getMutate({ route, options })
  }




  return { mutate, reset, isLoading, error, isSuccess, isError, variables };
}
export default useMutationAdvertising;
