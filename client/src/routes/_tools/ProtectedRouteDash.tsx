import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CreateContext } from "../../hooks/useContext";
import { ActionTypeDashboard } from "../../hooks/useContext/dash/reducer";
import useMutationUser from "../../hooks/useMutationUser";
import { IContext } from "../../interfaces/hooks/context.interface";

function ProtectedRouteDash() {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const { fetchUserMutation: { getQueryUser, removeFetch } } = useMutationUser();
  const { dataUser } = getQueryUser()

  if (!dataUser?.verifiedEmail) {
    dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
    localStorage.removeItem("token");
    removeFetch()
    return <Navigate to={"/"} />
  } else {
    return <Outlet />
  }
}

export default ProtectedRouteDash;