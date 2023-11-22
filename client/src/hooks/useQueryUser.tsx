import { useQuery } from "@tanstack/react-query";
import { IUser } from "../interfaces/user.interface";
import { Error, MakeUserRequestReturn, userRequest } from "../services/userApi";
import { RequestMapUser, RouteUser } from "../services/userRequest";

function useQueryUser<T extends RouteUser.Login | RouteUser.Token | RouteUser.AccountAdminGet>(route: T, options: Omit<RequestMapUser[T], 'route' | 'method'>, enabled: boolean = false) {
  const { isLoading: isLoadingUser, data, error: errorUser, isSuccess: isSuccessUser, isError: isErrorUser } = useQuery<MakeUserRequestReturn, Error>({
    queryKey: route === RouteUser.AccountAdminGet ? IUser.USER_NAME_QUERY_ALL: IUser.USER_NAME_QUERY,
    queryFn: () => userRequest(route).options(options),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    retry: (_failureCount, error) => {
      if (error.status_code === 401) localStorage.removeItem("token")
      return false
    },
  });
  return { statusUserQuery: { dataUser: data?.data[0], dataSuccess: data, isLoadingUser, isSuccessUser, errorUser, isErrorUser } };
}
export default useQueryUser;
