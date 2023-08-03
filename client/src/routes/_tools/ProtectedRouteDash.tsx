import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/reducers/user';

function ProtectedRouteDash() {
  const userData = useAppSelector(selectUserData);

  if (userData) {
    return <Outlet />
  } else {
    return <Navigate to={"/"} />
  }
}

export default ProtectedRouteDash;