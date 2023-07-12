import { lazy } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Loadable from '../components/utils/Loadable';


type Props = {
  isAllowed?: boolean;
}

const ProtectedRoute = ({ isAllowed }: Props) =>
  isAllowed ? <Navigate to={"/"} /> : <Outlet />;


const Registre = Loadable(lazy(() => import("../pages/authenticate/registre")))
const Login = Loadable(lazy(() => import("../pages/authenticate/login")))
const Reset = Loadable(lazy(() => import("../pages/authenticate/reset")))


const Authenticate = {
  path: "/",
  element: <ProtectedRoute isAllowed={false} />,
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
  ],
};

export default Authenticate;
