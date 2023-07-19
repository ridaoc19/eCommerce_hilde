import './App.scss';
import Routes from './routes';


import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearUser, selectUserData, selectUserError } from './redux/reducers/user';
import { loginTokenPosts } from './redux/reducers/user/actions';


function App() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectUserError)
  const user = useAppSelector(selectUserData)
  const token: string | undefined = localStorage?.token

  useEffect(() => {
    if (token && !user) dispatch(loginTokenPosts({ token }))
  }, [])

  useEffect(() => {
    if (error === "Invalid token") {
      localStorage.removeItem("token")
      dispatch(clearUser());
    }
  }, [error])








  return (
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
    </div>
  );
}

export default App;
