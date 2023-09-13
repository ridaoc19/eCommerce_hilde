import { useEffect } from 'react';
import { StoreContext } from './hooks/useContext';
import { IUser } from './interfaces/user.interface';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearUser, selectUserData, selectUserError } from './redux/reducers/user';
import { userPosts } from './redux/reducers/user/actions';
import Routes from './routes';
import './styles/app/App.scss';
import { useQuery } from '@tanstack/react-query';
import { Route, makeProductsRequest } from './services/productApi';
import { IProduct } from './interfaces/product.interface';

function App() {
  const dispatch = useAppDispatch();
  const errorUser = useAppSelector(selectUserError)
  const user = useAppSelector(selectUserData)
  const token: IUser.UserData['token'] = localStorage?.token
  const { isLoading, isError, error, isFetching } = useQuery({
    queryKey: IProduct.PRODUCT_NAME_QUERY,
    queryFn: () => makeProductsRequest(Route.ProductRequest).withOptions({}),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  useEffect(() => {
    if (token) {
      const dataPost = Object.assign({ token }, { routes: 'token' as const });
      if (token && !user) dispatch(userPosts(dataPost as IUser.tokenData))
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (errorUser === "Invalid token") {
      localStorage.removeItem("token")
      dispatch(clearUser())
    }
    // eslint-disable-next-line
  }, [errorUser])

  return (
    <div>
      <StoreContext>
        <div>{isLoading}/{isError}/{JSON.stringify(error)}/{isFetching}</div>
        <Routes />
      </StoreContext>
    </div>
  );
}

export default App;
