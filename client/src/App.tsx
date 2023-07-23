import './App.scss';
import Routes from './routes';

import { useEffect } from 'react';
import { StoreContext } from './components/hooks/useContext';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearUser, selectUserData, selectUserError } from './redux/reducers/user';
import { userPosts } from './redux/reducers/user/actions';


function App() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectUserError)
  const user = useAppSelector(selectUserData)
  const token: string | undefined = localStorage?.token

  useEffect(() => {
    if (token && !user) dispatch(userPosts(Object.assign({ token }, { routes: 'token' })))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (error === "Invalid token") {
      localStorage.removeItem("token")
      dispatch(clearUser());
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
