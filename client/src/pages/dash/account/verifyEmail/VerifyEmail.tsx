import { useContext } from "react";
import { CreateContext } from "../../../../hooks/useContext";


function VerifyEmail() {
  // const { id } = useParams();
  // const { tools, data: { getUserQueryData }, status } = useMutationUser();
  // const { userQueryData, isFetchingUser } = getUserQueryData()
  const { dashboard: { stateDashboard: { login } } } = useContext(CreateContext)

  return (
    <div>
      {login.isLoading && <div>Cargando...</div>}
      {/* {userQueryData && <p>{userQueryData.message}</p>} */}
      <h2>Valida el correo electrónico</h2>
      <button onClick={() => {
        // tools.fetch(RouteUser.Verify).options({ requestData: { tokenEmail: id || "" } })
      }}>Validar</button>
      {login.isError && login?.errors[0].message}
    </div>
  );
}

export default VerifyEmail;