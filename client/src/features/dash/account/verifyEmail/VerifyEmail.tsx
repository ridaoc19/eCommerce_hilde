import { useParams } from "react-router-dom";
import { RouteUser, useMutationUser } from "../../../auth/login";


function VerifyEmail() {
  const { id } = useParams();
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userQueryData, isFetchingUser } = getUserQueryData()

  return (
    <div>
      {isFetchingUser && <div>Cargando...</div>}
      {userQueryData && <p>{userQueryData.message}</p>}
      <h2>Valida el correo electrónico</h2>
      <button onClick={() => {
        tools.fetch(RouteUser.Verify).options({ requestData: { tokenEmail: id || "" } })
      }}>Validar</button>
      {status.isUserError && status.userError?.errors[0].message}
    </div>
  );
}

export default VerifyEmail;