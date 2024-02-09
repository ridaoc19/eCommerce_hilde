import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import ErrorMessage from './components/common/ErrorMessage/ErrorMessage';
import { CreateContext } from './hooks/useContext';
import useQueryUser from './hooks/useQueryUser';
import { IAdvertising } from './interfaces/advertising.interface';
import { IProduct } from './interfaces/product.interface';
import { IUser } from './interfaces/user.interface';
import Routes from './routes';
import { ErrorAdvertising, MakeAdvertisingRequestReturn, advertisingRequest } from './services/advertising/advertisingApi';
import { RequestMapAdvertising, RouteAdvertising } from './services/advertising/advertisingRequest';
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from './services/navigation/navigationApi';
import { RequestMapNavigation, RouteNavigation } from './services/navigation/navigationRequest';
import { RouteUser } from './services/user/userRequest';
import './styles/app/App.scss';

function App() {
  const { error: { errorContextDispatch, errorContextState }, navigation: { navigationContextDispatch }, advertising: { advertisingContextDispatch } } = useContext(CreateContext)!
  const token: IUser.UserData['token'] = localStorage?.token || ""

  const advertising =
    useQuery<MakeAdvertisingRequestReturn & { data: RequestMapAdvertising[RouteAdvertising.AdvertisingRequest]['data'] }, ErrorAdvertising>({
      queryKey: [IAdvertising.QUERY_KEY_PRODUCT.Advertising],
      queryFn: async () => await advertisingRequest(RouteAdvertising.AdvertisingRequest).options({}),
      // onError: (error: ErrorNavigation) => error,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // enabled: true,
    });

  const { isFetching, isLoading, data, error, isSuccess, isError } =
    useQuery<MakeNavigationRequestReturn & { data: RequestMapNavigation[RouteNavigation.NavigationMenu]['data'] }, ErrorNavigation>({
      queryKey: [IProduct.QUERY_KEY_PRODUCT.Navigation],
      queryFn: async () => await navigationRequest(RouteNavigation.NavigationMenu).options({}),
      // onError: (error: ErrorNavigation) => error,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // enabled: true,
    });

  const { statusUserQuery: { errorUser } } = useQueryUser<RouteUser.Token>(RouteUser.Token, { requestData: { token } }, !!token);

  useEffect(() => {
    errorUser && errorContextDispatch({ type: 'errors', payload: errorUser.errors })
    // eslint-disable-next-line
  }, [errorUser])

  useEffect(() => {
    navigationContextDispatch({
      type: 'hierarchicalData',
      payload: {
        isLoading,
        isFetching,
        data: data?.data ? data.data : [],
        errors: error?.errors ? error.errors : []
      }
    })

    error && errorContextDispatch({ type: 'errors', payload: error.errors })
    // eslint-disable-next-line
  }, [isFetching, isLoading, isError, isSuccess])


  useEffect(() => {
    advertisingContextDispatch({
      type: 'advertisingData',
      payload: {
        isLoading: advertising.isLoading,
        isFetching: advertising.isFetching,
        data: advertising.data?.data ? advertising.data.data : [],
        errors: advertising.error?.errors ? advertising.error.errors : []
      }
    })

    advertising.error && errorContextDispatch({ type: 'errors', payload: advertising.error.errors })
    // eslint-disable-next-line
  }, [advertising.isLoading, advertising.isFetching, advertising.isError, advertising.isSuccess])


  return (
    <div className='app'>
      {errorContextState.errors.length > 0 && <ErrorMessage errors={errorContextState.errors} emptyMessage={() => errorContextDispatch({ type: 'errors', payload: [] })} />}
      <Routes />
    </div>
  );
}

export default App;
