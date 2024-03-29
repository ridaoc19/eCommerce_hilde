import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { IUser, TypeDashboard } from "../interfaces/user.interface";
import { Success } from "../pages/auth/login";
import { Error, MakeUserRequestReturn, userRequest } from "../services/user/userApi";
import { RequestMapUser, RouteUser } from "../services/user/userRequest";
import { CreateContext } from "./useContext";
import { IErrorReducer } from "./useContext/error/reducer";

function useQueryUser<T extends RouteUser.Login | RouteUser.Token | RouteUser.AccountAdminGet>(route: T, options: Omit<RequestMapUser[T], 'route' | 'method'>, enabled: boolean = false) {
  const queryClient = useQueryClient();
  const { error: { errorContextDispatch }, dashboard: { dispatchDashboard, stateDashboard: { login } } } = useContext(CreateContext)
  const { isLoading, data, error, isSuccess, isError, } = useQuery<MakeUserRequestReturn, Error>({
    queryKey: route === RouteUser.AccountAdminGet ? [IUser.QUERY_KEY_USER.MultipleUsers] : [IUser.QUERY_KEY_USER.SingleUser],
    queryFn: () => userRequest(route).options(options),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    retry: (_failureCount, error) => { //retry se configura para repetir si sale error y cuantas veces
      if (error.status_code === 401) localStorage.removeItem("token")
      return false
    },
  });

  useEffect(() => {
    dispatchDashboard({
      type: TypeDashboard.DASHBOARD_LOGIN, payload: {
        status: data?.status || "",
        isLoading,
        isLogin: login.isLogin,
        isSuccess,
        errors: error?.errors ? error.errors.filter(e => e.field !== 'general') : [],
        user: data ? data.data[0] : IUser.userDataEmpty,
        userAll: []
      }
    })
  }, [isLoading, isError, isSuccess])

  useEffect(() => {
    error && errorContextDispatch({ type: IErrorReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
    // eslint-disable-next-line
  }, [error])

  useEffect(() => {
    if (login.isLogin) {
      errorContextDispatch({ type: IErrorReducer.keyDashboard.MESSAGE_UPDATE, payload: [{ field: 'general', message: <Success />, status_code: 200 }] })
    }
  }, [login.isLogin])


  const tools = {
    removeAllQueries() {
      queryClient.removeQueries({ queryKey: [IUser.QUERY_KEY_USER.MultipleUsers] });
    },
    removeQuery() {
      queryClient.removeQueries({ queryKey: [IUser.QUERY_KEY_USER.SingleUser] });
    }
  }


  return { tools, statusUserQuery: { dataUser: data?.data[0], dataSuccess: data, isLoadingUser: isLoading, isSuccessUser: isSuccess, errorUser: error, isErrorUser: isError } };
}
export default useQueryUser;
