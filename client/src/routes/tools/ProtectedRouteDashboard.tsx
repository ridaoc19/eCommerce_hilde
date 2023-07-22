import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from '../../redux/hooks';
// import { selectUserData } from '../../redux/reducers/user';

function ProtectedRouteDashboard() {
  // const user = useAppSelector(selectUserData);

  if (false) {
    // if (user?.v) {
    return <Navigate to={"/"} />
  } else {
    return <Outlet />
  }
}

export default ProtectedRouteDashboard;