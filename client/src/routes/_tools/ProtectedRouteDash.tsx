import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CreateContext, IContextData } from "../../hooks/useContext";
import { ActionTypeDashboard } from "../../hooks/useContext/dash/reducer";
import useMutationUser from "../../hooks/useMutationUser";

function ProtectedRouteDash() {
  const { dashboard: { dispatch: dispatchContext } }: IContextData = useContext(CreateContext)!
  const { tools, data: { getUserQueryData } } = useMutationUser();
  const { userData, isFetchingUser } = getUserQueryData()

  useEffect(() => {
    if (!userData?.verifiedEmail && !isFetchingUser) {
      dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
      localStorage.removeItem("token");
      tools.removeQuery()
    }
    // eslint-disable-next-line
  }, [isFetchingUser])

  if (!userData?.verifiedEmail) {
    return <Navigate to={"/"} />
  } else {
    return <Outlet />
  }
}

export default ProtectedRouteDash;


// function ProtectedRouteDash() {
//   return (
//     <div>
      
//     </div>
//   );
// }

// export default ProtectedRouteDash;