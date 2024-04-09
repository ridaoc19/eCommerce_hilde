import InitialAdvertising from './pages/auth/app/InitialAdvertising';
import InitialMessages from './pages/auth/app/InitialMessages';
import InitialNavigation from './pages/auth/app/InitialNavigation';
import InitialUser from './pages/auth/app/InitialUser';
import Routes from './routes';
import './styles/app/App.scss';

function App() {
  // const { tools } = useMutationUser();
  // const { messages: { messagesContextState }, dashboard: { stateDashboard: { login } } } = useContext(CreateContext)!
  // const token: IUser.UserData['token'] = localStorage?.token || ""

  // const advertising =
  //   useQuery<MakeAdvertisingRequestReturn & { data: RequestMapAdvertising[RouteAdvertising.AdvertisingRequest]['data'] }, ErrorAdvertising>({
  //     queryKey: [IAdvertising.QUERY_KEY_PRODUCT.Advertising],
  //     queryFn: async () => await advertisingRequest(RouteAdvertising.AdvertisingRequest).options({}),
  //     // onError: (error: ErrorNavigation) => error,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     // enabled: true,
  //   });

  // const { isFetching, isLoading, data, error, isSuccess, isError } =
  //   useQuery<MakeNavigationRequestReturn & { data: RequestMapNavigation[RouteNavigation.NavigationMenu]['data'] }, ErrorNavigation>({
  //     queryKey: [IProduct.QUERY_KEY_PRODUCT.Navigation],
  //     queryFn: async () => await navigationRequest(RouteNavigation.NavigationMenu).options({}),
  //     // onError: (error: ErrorNavigation) => error,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     // enabled: true,
  //   });

  // useEffect(() => {
  //   if (!!token && !login.isLogin) {
  //     console.log({ token, login }, "entro")
  //     tools.fetch(RouteUser.Token).options({ requestData: { token } })
  //   }
  // }, [token, login.isLogin])



  // useQueryUser<RouteUser.Token>(RouteUser.Token, { requestData: { token } }, !!token && !login.isLogin);


  // useEffect(() => {
  //   navigationContextDispatch({
  //     type: 'hierarchicalData',
  //     payload: {
  //       isLoading,
  //       isFetching,
  //       data: data?.data ? data.data : [],
  //       errors: error?.errors ? error.errors : []
  //     }
  //   })

  //   error && messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: error.errors.map(e => { return { ...e, status_code: error.status_code } }) })
  //   // eslint-disable-next-line
  // }, [isFetching, isLoading, isError, isSuccess])


  // useEffect(() => {
  //   advertisingContextDispatch({
  //     type: 'advertisingData',
  //     payload: {
  //       isLoading: advertising.isLoading,
  //       isFetching: advertising.isFetching,
  //       data: advertising.data?.data ? advertising.data.data : { dataAdvertising: [], topViewedProducts: [] },
  //       errors: advertising.error?.errors ? advertising.error.errors : []
  //     }
  //   })

  //   advertising.error && messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_UPDATE, payload: advertising.error.errors.map(e => { return { ...e, status_code: advertising.error.status_code } }) })
  //   // eslint-disable-next-line
  // }, [advertising.isLoading, advertising.isFetching, advertising.isError, advertising.isSuccess])

  return (
    <div className='app'>
      <InitialAdvertising />
      <InitialNavigation />
      <InitialUser />
      <InitialMessages />
      {/* {messagesContextState.messages.length > 0 && <ErrorMessage messages={messagesContextState.messages} />} */}
      <Routes />
    </div>
  );
}

export default App;
