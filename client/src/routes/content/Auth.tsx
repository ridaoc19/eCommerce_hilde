import { lazy } from 'react';
import Loadable from '../_tools/Loadable';
import ProtectedAuth from '../_tools/ProtectedAuth';

const Login = Loadable(lazy(() => import('../../pages/auth/login/Login')))
const Registre = Loadable(lazy(() => import('../../pages/auth/registre/Registre')))
const PassChange = Loadable(lazy(() => import('../../pages/auth/PassChange/PassChange')))
const Reset = Loadable(lazy(() => import('../../pages/auth/reset/Reset')))

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
    {
      path: "/reset",
      element: <Reset />,
    },
  ],
};


export default Auth;