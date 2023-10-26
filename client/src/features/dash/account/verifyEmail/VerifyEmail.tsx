import { useParams } from "react-router-dom";
import { IUser } from "../../../../interfaces/user.interface";
import { useAppDispatch } from "../../../../redux/hooks";
import { userPosts } from "../../../../redux/reducers/user/actions";

function VerifyEmail() {
  const { id } = useParams();
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>Valida el correo electrónico</h2>
      <button onClick={() => { dispatch(userPosts({ tokenEmail: id, routes: 'verify' } as IUser.tokenEmail)) }}>Validar</button>
    </div>
  );
}

export default VerifyEmail;