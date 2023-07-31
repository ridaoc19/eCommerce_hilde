import { lazy } from 'react';
import Loadable from '../_tools/Loadable';
import ProtectedAuth from '../_tools/ProtectedAuth';



const Login = Loadable(lazy(() => import('../../features/auth/login')))

const Auth = {
  path: "/",
  element: <ProtectedAuth />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: "/registre",
    //   element: <Registre />,
    // },
    // {
    //   path: "/reset",
    //   element: <Reset />,
    // },
    // {
    //   path: "/change",
    //   element: <PasswordChange />,
    // },
  ],
};


export default Auth;