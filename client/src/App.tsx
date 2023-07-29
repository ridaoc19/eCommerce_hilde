import { useEffect } from 'react';
import './App.scss';
import { StoreContext } from './components/hooks/useContext';
import { IReduxUser } from './interfaces/redux/user.interface';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearUser, selectUserData, selectUserError } from './redux/reducers/user';
import { userPosts } from './redux/reducers/user/actions';
import Routes from './routes';


function App() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectUserError)
  const user = useAppSelector(selectUserData)
  const token: IReduxUser.UserPostsProps['token'] = localStorage?.token

  useEffect(() => {
    if (token) {
      const dataPost: Pick<IReduxUser.UserPostsProps, 'token' | 'routes'> = Object.assign({ token }, { routes: 'token' as const });
      if (token && !user) dispatch(userPosts(dataPost))
    } 
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (error === "Invalid token") {
      localStorage.removeItem("token")
      dispatch(clearUser())
    }
    // eslint-disable-next-line
  }, [error])

  return (
    <div className="App">
      <header className="App-header">
        <StoreContext>
          <Routes />
        </StoreContext>
      </header>
    </div>
  );
}

export default App;
