import { lazy } from 'react';
import Loadable from '../_tools/Loadable';
import ProtectedAuth from '../_tools/ProtectedAuth';

const Login = Loadable(lazy(() => import('../../features/auth/login')))
const Registre = Loadable(lazy(() => import('../../features/auth/registre')))
const PassChange = Loadable(lazy(() => import('../../features/auth/PassChange')))
// const Reset = Loadable(lazy(() => import('../../features/auth/reset')))

const Auth = {
  path: "/",
  element: <ProtectedAuth />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registre",
      element: <Registre />,
    },
    {
      path: "/change",
      element: <PassChange />,
    },
    // {
    //   path: "/reset",
    //   element: <Reset />,
    // },
  ],
};


export default Auth;