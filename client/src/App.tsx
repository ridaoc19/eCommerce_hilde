import { useQuery } from '@tanstack/react-query';
import { StoreContext } from './hooks/useContext';
import useQueryUser from './hooks/useQueryUser';
import { IProduct } from './interfaces/product.interface';
import { IUser } from './interfaces/user.interface';
import Routes from './routes';
import { Route, makeProductsRequest } from './services/productApi';
import { RouteUser } from './services/userRequest';
import './styles/app/App.scss';

function App() {
  const token: IUser.UserData['token'] = localStorage?.token || ""
  useQueryUser<RouteUser.Token>(RouteUser.Token, { requestData: { token } });
  const { isSuccess } = useQuery({
    queryKey: IProduct.PRODUCT_NAME_QUERY,
    queryFn: () => makeProductsRequest(Route.ProductRequest).withOptions({}),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return (
    <div>
      <StoreContext>
        {isSuccess && <Routes />}
      </StoreContext>
    </div>
  );
}

export default App;
