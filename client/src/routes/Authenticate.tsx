import { lazy } from 'react';
import Loadable from '../components/utils/Loadable';
import ProtectedRoute from './tools/ProtectedRoute';


const Registre = Loadable(lazy(() => import("../pages/authenticate/registre")))
const Login = Loadable(lazy(() => import("../pages/authenticate/login")))
const Reset = Loadable(lazy(() => import("../pages/authenticate/reset")))
const PasswordChange = Loadable(lazy(() => import('../pages/authenticate/PasswordChange')))


const Authenticate = {
  path: "/",
  element: <ProtectedRoute/>,
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
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/change",
      element: <PasswordChange />,
    },
  ],
};

export default Authenticate;
