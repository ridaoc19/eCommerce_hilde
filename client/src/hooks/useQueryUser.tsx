import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { IUser, TypeDashboard } from "../interfaces/user.interface";
import { Error, MakeUserRequestReturn, userRequest } from "../services/user/userApi";
import { RequestMapUser, RouteUser } from "../services/user/userRequest";
import { CreateContext } from "./useContext";
import { IMessagesReducer } from "./useContext/messages/reducer";

function useQueryUser<T extends RouteUser.Token>(route: T, options: Omit<RequestMapUser[T], 'route' | 'method'>, enabled: boolean = false) {
  const queryClient = useQueryClient();
  const { messages: { messagesContextDispatch }, dashboard: { dispatchDashboard, stateDashboard: { login } } } = useContext(CreateContext)
  const { isLoading, data, error, isSuccess, isError, } = useQuery<MakeUserRequestReturn, Error>({
    queryKey: [IUser.QUERY_KEY_USER.SingleUser],
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
    if (data?.data && data.field !== 'login') {
      dispatchDashboard({
        type: TypeDashboard.DASHBOARD_LOGIN, payload: {
          field: data?.field || "",
          isLoading,
          isLogin: login.isLogin,
          isSuccess,
          errors: error?.errors ? error.errors.filter(e => e.field !== 'general') : [],
          user: data?.data && data.data.length > 0 ? data.data[0] : IUser.userDataEmpty,
          userAll: []
        }
      })
    }
    // eslint-disable-next-line
  }, [isLoading, isError, isSuccess])

  useEffect(() => {
    error && messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
    // eslint-disable-next-line
  }, [error])

  useEffect(() => {
    if (data && login.isLogin && login.field !== 'login') {
      messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: [{ field: data.field, message: data.message, status_code: data.status_code }] })
    }
    // eslint-disable-next-line
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
