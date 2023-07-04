import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/authenticate/login";
import Registre from "../pages/authenticate/registre";

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
  ],
};

export default Authenticate;
