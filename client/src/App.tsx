import { useEffect } from 'react';
import { StoreContext } from './hooks/useContext';
import { IUser } from './interfaces/user.interface';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearUser, selectUserData, selectUserError } from './redux/reducers/user';
import { userPosts } from './redux/reducers/user/actions';
import Routes from './routes';
import './styles/app/App.scss';

function App() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectUserError)
  const user = useAppSelector(selectUserData)
  const token: IUser.UserData['token'] = localStorage?.token

  useEffect(() => {
    if (token) {
      const dataPost = Object.assign({ token }, { routes: 'token' as const });
      if (token && !user) dispatch(userPosts(dataPost as IUser.tokenData))
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
    <div>
      <StoreContext>
        <Routes />
      </StoreContext>
    </div>
  );
}

export default App;
