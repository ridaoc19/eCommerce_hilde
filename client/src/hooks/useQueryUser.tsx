import { useQuery } from "@tanstack/react-query";
import { IUser } from "../interfaces/user.interface";
import { Error, MakeUserRequestReturn, userRequest } from "../services/userApi";
import { RequestMapUser, RouteUser } from "../services/userRequest";

function useQueryUser<T extends RouteUser.Login | RouteUser.Token>(route: T, options: Omit<RequestMapUser[T], 'route' | 'method'>) {
  const { isLoading: isLoadingUser, data, error: errorUser, isSuccess: isSuccessUser, isError: isErrorUser } = useQuery<MakeUserRequestReturn, Error>({
    queryKey: IUser.PRODUCT_NAME_QUERY,
    queryFn: () => userRequest(route).options(options),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (_failureCount, error) => {
      if (error.status_code === 401) localStorage.removeItem("token")
      return false
    },
  });
  return { statusUserQuery: { dataUser: data?.data, dataSuccess: data, isLoadingUser, isSuccessUser, errorUser, isErrorUser } };
}
export default useQueryUser;
