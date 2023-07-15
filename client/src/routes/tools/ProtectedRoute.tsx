import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/reducers/user';

function ProtectedRoute() {
  const user = useAppSelector(selectUserData);

  if (user?.state) {
    return <Navigate to={"/"} />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute;