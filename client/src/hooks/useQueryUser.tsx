import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../interfaces/user.interface";
import { RequestMapUser, RouteUser } from "../services/user/userRequest";
import { MakeUserRequestReturn, userRequest, Error } from "../services/user/userApi";

function useQueryUser<T extends RouteUser.Login | RouteUser.Token | RouteUser.AccountAdminGet>(route: T, options: Omit<RequestMapUser[T], 'route' | 'method'>, enabled: boolean = false) {
  const queryClient = useQueryClient();
  const { isLoading: isLoadingUser, data, error: errorUser, isSuccess: isSuccessUser, isError: isErrorUser, } = useQuery<MakeUserRequestReturn, Error>({
    queryKey: route === RouteUser.AccountAdminGet ? [IUser.QUERY_KEY_USER.MultipleUsers] : [IUser.QUERY_KEY_USER.SingleUser],
    queryFn: () => userRequest(route).options(options),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    retry: (_failureCount, error) => { //retry se configura para repetir si sale error y cuantas veces
      console.log(error, "user error")
      if (error.status_code === 401) localStorage.removeItem("token")
      return false
    },
  });


  const tools = {
    removeAllQueries() {
      queryClient.removeQueries({ queryKey: [IUser.QUERY_KEY_USER.MultipleUsers] });
    },
    removeQuery() {
      queryClient.removeQueries({ queryKey: [IUser.QUERY_KEY_USER.SingleUser] });
    }
  }


  return { tools, statusUserQuery: { dataUser: data?.data[0], dataSuccess: data, isLoadingUser, isSuccessUser, errorUser, isErrorUser } };
}
export default useQueryUser;
