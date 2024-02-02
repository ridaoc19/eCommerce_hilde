import { useContext, useEffect } from 'react';
// import { useQuery } from 'react-query';
import { useQuery } from '@tanstack/react-query';
import { CreateContext } from './hooks/useContext';
import { IAdvertising } from './interfaces/advertising.interface';
import { IProduct } from './interfaces/product.interface';
import Routes from './routes';
import { ErrorAdvertising, MakeAdvertisingRequestReturn, advertisingRequest } from './services/advertising/advertisingApi';
import { RequestMapAdvertising, RouteAdvertising } from './services/advertising/advertisingRequest';
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from './services/navigation/navigationApi';
import { RequestMapNavigation, RouteNavigation } from './services/navigation/navigationRequest';
import './styles/app/App.scss';

function App() {
  const { navigation: { navigationContextDispatch }, advertising: { advertisingContextDispatch } } = useContext(CreateContext)!
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

    // eslint-disable-next-line
  }, [advertising.isLoading, advertising.isFetching, advertising.isError, advertising.isSuccess])


  return (
    <div className='app'>
      <Routes />
    </div>
  );
}

export default App;
