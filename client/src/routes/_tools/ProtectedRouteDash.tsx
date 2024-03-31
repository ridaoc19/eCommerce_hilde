import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CreateContext } from "../../hooks/useContext";

function ProtectedRouteDash() {
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { userData } = getUserQueryData()
  const { dashboard: { stateDashboard: { login: {user} } } } = useContext(CreateContext)


  if (!user?.verifiedEmail) {
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