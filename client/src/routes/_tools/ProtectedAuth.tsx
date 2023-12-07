import { Navigate, Outlet } from "react-router-dom";

function ProtectedAuth() {

  if (localStorage?.token) {
    return <Navigate to={"/"} />
  } else {
    return <Outlet />
  }
}

export default ProtectedAuth;