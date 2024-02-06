import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../interfaces/user.interface";
import { Error, MakeUserRequestReturn, userRequest } from "../services/user/userApi";
import { RequestMapUser, RouteUser } from "../services/user/userRequest";

function useMutationUser() {
  const queryClient = useQueryClient();

  const {
    mutate: executeUserMutation,
    reset: resetUserMutation,
    isPending: isLoadingUser,
    error: userError,
    isSuccess: isUserSuccess,
    isError: isUserError,
  } = useMutation({
    mutationFn: ({ route, options }: { route: RouteUser, options: Omit<RequestMapUser[RouteUser], 'route' | 'method'> }) => {
      const requestData = userRequest(route).options(options);
      return requestData;
    },
    onError(error: Error) {
      return error;
    },
    onSuccess(data, { route }) {
      if (route === RouteUser.AccountAdminGet || route === RouteUser.AccountAdminDelete || route === RouteUser.AccountAdminPut) {
        console.log(route, "entro muchos")
        queryClient.invalidateQueries({ queryKey: [IUser.QUERY_KEY_USER.MultipleUsers] })
      } else {
        console.log(route, "entro uno")
        queryClient.setQueryData([IUser.QUERY_KEY_USER.SingleUser], data);
      }
    },
  });

  const dataSection = {
    getUserQueryData() {
      const isFetchingUser = queryClient.isFetching({ queryKey: [IUser.QUERY_KEY_USER.SingleUser] })
      const userQueryData = queryClient.getQueryData<MakeUserRequestReturn | undefined>([IUser.QUERY_KEY_USER.SingleUser]);
      return { userData: userQueryData?.data[0] || null, userQueryData, isFetchingUser: !!isFetchingUser };
    },
    getAllUserQueryData() {
      const isFetchingAllUser = queryClient.isFetching({ queryKey: [IUser.QUERY_KEY_USER.MultipleUsers] })
      const allUserQueryData = queryClient.getQueryData<MakeUserRequestReturn | undefined>([IUser.QUERY_KEY_USER.MultipleUsers]);
      return { allUserData: allUserQueryData?.data || null, allUserQueryData, isFetchingAllUser: !!isFetchingAllUser };
    },
  };

  const statusSection = {
    isLoadingUser,
    isUserSuccess,
    userError,
    isUserError,
  };

  const toolsSection = {
    fetch<T extends RouteUser>(route: T): { options: (options: Omit<RequestMapUser[T], 'route' | 'method'>) => void } {
      return {
        options: async (options: Omit<RequestMapUser[T], 'route' | 'method'>) => {
          executeUserMutation({ route, options });
        },
      };
    },
    removeAllQueries() {
      queryClient.removeQueries({ queryKey: [IUser.QUERY_KEY_USER.MultipleUsers] });
    },
    removeQuery() {
      queryClient.removeQueries({ queryKey: [IUser.QUERY_KEY_USER.SingleUser] });
    },
    resetError() {
      resetUserMutation();
    },
  }

  return {
    data: dataSection,
    status: statusSection,
    tools: toolsSection,
  };
}

export default useMutationUser;
