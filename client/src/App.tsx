import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { CreateContext } from './hooks/useContext';
import { IProduct } from './interfaces/product.interface';
import Routes from './routes';
import { ErrorNavigation, navigationRequest } from './services/navigationApi';
import { RouteNavigation } from './services/navigationRequest';
import './styles/app/App.scss';

function App() {
  const { navigation: { navigationContextDispatch } } = useContext(CreateContext)!

  const { isFetching, isLoading, data, error, isSuccess, isError } =
    useQuery({
      queryKey: [IProduct.QUERY_KEY_PRODUCT.Navigation],
      queryFn: async () => await navigationRequest(RouteNavigation.NavigationMenu).options({}),
      onError: (error: ErrorNavigation) => error,
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

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
