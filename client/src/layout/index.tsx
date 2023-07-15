import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUser, selectUserData, selectUserError } from '../redux/reducers/user';
import { loginTokenPosts } from '../redux/reducers/user/actions';


type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  // const dispatch = useAppDispatch();
  // const error = useAppSelector(selectUserError)
  // const user = useAppSelector(selectUserData)
  // const token: string | undefined = localStorage?.token
  // const [isFetching, setIsFetching] = useState<boolean>(false);

  // useEffect(() => {
  //   if (token && !user && !isFetching) {
  //     setIsFetching(true)
  //     dispatch(loginTokenPosts({ token }))
  //   }
  // }, [])

  // useEffect(() => {
  //   if (error === "Invalid token") {
  //     localStorage.removeItem("token")
  //     dispatch(clearUser());
  //   }
  // }, [error])

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;