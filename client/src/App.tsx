import { StoreContext } from './hooks/useContext';
import useQueryProduct from './hooks/useQueryProduct';
import useQueryUser from './hooks/useQueryUser';
import { IUser } from './interfaces/user.interface';
import Routes from './routes';
import { RouteProduct } from './services/productRequest';
import { RouteUser } from './services/userRequest';
import './styles/app/App.scss';

function App() {
  const token: IUser.UserData['token'] = localStorage?.token || ""
  useQueryUser<RouteUser.Token>(RouteUser.Token, { requestData: { token } }, !!token);
  useQueryProduct({ route: RouteProduct.ProductRequest, options: {}, enabled: true })
  // const { isSuccess } = useQuery({
  //   queryKey: IProduct.PRODUCT_NAME_QUERY,
  //   queryFn: () => makeProductsRequest(Route.ProductRequest).withOptions({}),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false
  // })

  return (
    <div>
      <StoreContext>
        {<Routes />}
      </StoreContext>
    </div>
  );
}

export default App;
