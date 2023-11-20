import { useParams } from "react-router-dom";
import { RouteUser, useMutationUser } from "../../../auth/login";


function VerifyEmail() {
  const { id } = useParams();
  const { fetchUserMutation: { fetch }, statusUserMutation: { dataSuccess, errorUser, isErrorUser, isLoadingUser } } = useMutationUser();

  return (
    <div>
      {isLoadingUser && <div>Cargando...</div>}
      {dataSuccess && <p>{dataSuccess.message}</p>}
      <h2>Valida el correo electrónico</h2>
      <button onClick={() => {
        fetch(RouteUser.Verify).options({ requestData: { tokenEmail: id || "" } })
        // dispatch(userPosts({ tokenEmail: id, routes: 'verify' } as IUser.tokenEmail)) 
      }}>Validar</button>
      {isErrorUser && errorUser?.errors[0].message}
    </div>
  );
}

export default VerifyEmail;