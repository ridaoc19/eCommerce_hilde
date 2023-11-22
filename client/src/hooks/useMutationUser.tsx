import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../interfaces/user.interface";
import { userRequest, Error, MakeUserRequestReturn } from "../services/userApi";
import { RequestMapUser, RouteUser } from "../services/userRequest";

function useMutationUser() {
  const queryClient = useQueryClient();

  const {
    mutate: executeUserMutation,
    reset: resetUserMutation,
    isLoading: isLoadingUser,
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
      if (route === RouteUser.AccountAdminGet) {
        // Lógica adicional en caso de éxito
      }

      const queryKey = route === RouteUser.AccountAdminGet ? IUser.USER_NAME_QUERY_ALL : IUser.USER_NAME_QUERY;
      queryClient.setQueryData(queryKey, data);
    },
  });

  const dataSection = {
    getUserQueryData() {
      const isFetchingUser = queryClient.isFetching(IUser.USER_NAME_QUERY)
      const userQueryData = queryClient.getQueryData<MakeUserRequestReturn | undefined>(IUser.USER_NAME_QUERY);
      return { userData: userQueryData?.data[0] || null, userQueryData, isFetchingUser: !!isFetchingUser };
    },
    getAllUserQueryData() {
      const isFetchingAllUser = queryClient.isFetching(IUser.USER_NAME_QUERY_ALL)
      const allUserQueryData = queryClient.getQueryData<MakeUserRequestReturn | undefined>(IUser.USER_NAME_QUERY_ALL);
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
      queryClient.removeQueries(IUser.USER_NAME_QUERY_ALL);
    },
    removeQuery() {
      queryClient.removeQueries(IUser.USER_NAME_QUERY);
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
