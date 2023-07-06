import { Navigate, Outlet } from "react-router-dom";
import Registre from "../pages/authenticate/registre";
import Login from "../pages/authenticate/login";
import Reset from "../pages/authenticate/reset";

type Props = {
  isAllowed?: boolean;
}

const ProtectedRoute = ({ isAllowed }: Props) =>
  isAllowed ? <Navigate to={"/"} /> : <Outlet />;

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
