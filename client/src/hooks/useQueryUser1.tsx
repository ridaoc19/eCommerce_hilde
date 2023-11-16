// import { useState } from "react";
// import { RequestMapUser, RouteUser } from "../services/userRequest";
// import { userRequest } from "../services/userApi";
// import { useQuery } from "@tanstack/react-query";
// import { IUser } from "../interfaces/user.interface";

// interface InitialStateFetch<T extends RouteUser.Login | RouteUser.Token> {
//   route: T;
//   options: Omit<RequestMapUser[T], 'route' | 'method'>;
//   complete: boolean;
// }

// const initialStateFetch: InitialStateFetch<RouteUser.Token> = {
//   route: RouteUser.Token,
//   options: { requestData: "" },
//   complete: false,
// };

// function useQueryUser() {
//   const [fetch, setFetch] = useState<InitialStateFetch<RouteUser.Login | RouteUser.Token>>(initialStateFetch);
//   const { data, isLoading } = GetQuery(fetch.route, fetch.options)
//   function fetchQueryUser<T extends RouteUser.Login | RouteUser.Token>(route: T): { options: (options: Omit<RequestMapUser[T], 'route' | 'method'>) => any } {
//     return {
//       options: async (options: Omit<RequestMapUser[T], 'route' | 'method'>) => {
//         setFetch({ route, options, complete: true });
//       },
//     };
//   }

//   return { fetchQueryUser, data, isLoading };
// }
// export default useQueryUser;

// export function GetQuery<T extends RouteUser.Login | RouteUser.Token>(route: T, options: Omit<RequestMapUser[T], 'route' | 'method'>) {

//   const { isLoading, data } = useQuery(IUser.PRODUCT_NAME_QUERY, () => {
//     const requestData = userRequest(route).options(options);
//     return requestData;
//   });
//   return { isLoading, data }
// }


function useQueryUser1() {
  return (
    <div>
      
    </div>
  );
}

export default useQueryUser1