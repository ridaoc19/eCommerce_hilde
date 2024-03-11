import { useReducer } from 'react';
import { initialStateNavigation, reducer } from './reducer';

function StateNavigation() {
  // const { isFetching, isLoading, data, error, isSuccess, isError } =
  //   useQuery({
  //     queryKey: [IProduct.QUERY_KEY_PRODUCT.Navigation],
  //     queryFn: async () => {
  //       const result = await navigationRequest(RouteNavigation.NavigationRequest).options({})
  //       return result
  //       // navigationContextDispatch({
  //       //   type: 'menu',
  //       //   payload: result.data
  //       // })
  //     },
  //     onError(error: ErrorNavigation) {
  //       return error
  //     },
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     // enabled: true,
  //   });

  const [navigationContextState, navigationContextDispatch] = useReducer(reducer, initialStateNavigation);

  // useEffect(() => {

  //   if (isSuccess) {
  //     navigationContextDispatch({
  //       type: 'menu',
  //       payload: data.data
  //     })
  //   }


  // }, [isSuccess, isError])



  // const tools = {
  //   solicitud() {

  //   }

  // }

  return { navigationContextState, navigationContextDispatch };
}

export default StateNavigation;