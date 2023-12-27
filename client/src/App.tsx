import { useQuery } from 'react-query';
import { IProduct } from './interfaces/product.interface';
import Routes from './routes';
import { ErrorNavigation, navigationRequest } from './services/navigationApi';
import { RouteNavigation } from './services/navigationRequest';
import './styles/app/App.scss';

function App() {
  useQuery({
    queryKey: [IProduct.QUERY_KEY_PRODUCT.Navigation],
    queryFn: async () => await navigationRequest(RouteNavigation.NavigationRequest).options({}),
    onError: (error: ErrorNavigation) => error,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // enabled: true,
  });

  // console.log({ isFetching, isLoading, data, error, isSuccess, isError })

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
