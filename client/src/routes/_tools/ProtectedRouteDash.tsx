import { Navigate, Outlet } from "react-router-dom";
import useMutationUser from "../../hooks/useMutationUser";

function ProtectedRouteDash() {
  const { fetchUserMutation: { getQueryUser } } = useMutationUser();
  const { dataUser } = getQueryUser()

  if (dataUser) {
    return <Outlet />
  } else {
    return <Navigate to={"/"} />
  }
}

export default ProtectedRouteDash;