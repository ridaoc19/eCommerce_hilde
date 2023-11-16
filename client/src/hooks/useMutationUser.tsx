import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../interfaces/user.interface";
import { userRequest, Error, MakeUserRequestReturn } from "../services/userApi";
import { RequestMapUser, RouteUser } from "../services/userRequest";

function useMutationUser() {
  const queryClient = useQueryClient();
  const { mutate, reset, isLoading: isLoadingUser, data, error: errorUser, isSuccess: isSuccessUser, isError: isErrorUser } = useMutation({
    mutationFn: ({ route, options }: { route: RouteUser, options: Omit<RequestMapUser[RouteUser], 'route' | 'method'> }) => {
      const requestData = userRequest(route).options(options);
      return requestData;
    },
    onError(error: Error) {
      return error
    },
    onSuccess(data, { route }) {
      if (route === RouteUser.Login || route === RouteUser.Token || route === RouteUser.Registre) {
        queryClient.setQueryData(IUser.PRODUCT_NAME_QUERY, data)
      } else {
        queryClient.invalidateQueries(IUser.PRODUCT_NAME_QUERY)
      }
    },
  });

  const fetchUserMutation = {
    fetch<T extends RouteUser>(route: T): { options: (options: Omit<RequestMapUser[T], 'route' | 'method'>) => void } {
      return {
        options: async (options: Omit<RequestMapUser[T], 'route' | 'method'>) => {
          mutate({ route, options })
        },
      };
    },
    removeFetch() {
      queryClient.removeQueries(IUser.PRODUCT_NAME_QUERY)
    },
    removeError() {
      reset()
    },
    getQueryUser() {
      const data = queryClient.getQueryData<MakeUserRequestReturn | undefined>(IUser.PRODUCT_NAME_QUERY);
      return { dataUser: data?.data || null }
    }
  }


  return { fetchUserMutation, statusUserMutation: { dataUser: data?.data, dataSuccess: data, isLoadingUser, isSuccessUser, errorUser, isErrorUser } };
}

export default useMutationUser;
