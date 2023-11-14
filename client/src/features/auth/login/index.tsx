import { useEffect, useState } from "react";
import useMutationUser from "../../../hooks/useMutationUser";
import useValidations from "../../../hooks/useValidations";
import { HandleChangeText, HandleClick } from "../../../interfaces/global.interface";
import { IUser } from "../../../interfaces/user.interface";
import { RouteUser } from "../../../services/userRequest";
import { clearUserError } from "../../../utils/userReusableFunctions";
import Form from "./Form";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

export enum LoginButtonName {
  Reset = 'reset',
  Login = 'login',
  Registre = 'registre',
  Back = 'back',
}
export interface InitialStateLogin {
  change: Pick<IUser.UserData, 'email' | 'password'>
  error: Pick<IUser.UserData, 'email' | 'password'>
}

const initialStateLogin: InitialStateLogin = {
  change: { email: "", password: "" },
  error: { email: "", password: "" }
}

function Login() {
  const { getValidationErrors } = useValidations();
  const { fetchUserMutation, statusUserMutation } = useMutationUser();
  const { dataUser, isSuccessUser } = statusUserMutation;
  const [stateLogin, setStateLogin] = useState<InitialStateLogin>(initialStateLogin);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (dataUser) {
      if (dataUser.verified) {
        if (!dataUser.verifiedEmail) {
          setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, email: `${dataUser.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${dataUser.email}` } }))
        } else {
          setSuccess(true)
          localStorage.token = dataUser.token;
        }
        setTimeout(() => {
          setSuccess(false)
          return navigate('/')
        }, 10000);
      } else {
        return navigate('/change');
      }
    }
    // eslint-disable-next-line
  }, [isSuccessUser])

  const handleChangeLogin: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => fetchUserMutation.removeError(), (state) => setStateLogin(state), initialStateLogin, stateLogin)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) {
      return setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))

    }
    setStateLogin(prevState => ({
      ...prevState,
      change: { ...prevState.change, [name]: value },
      error: { ...prevState.error, [name]: error }
    }))
  }

  const handleClickLogin: HandleClick = (event) => {

    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "login":
        fetchUserMutation.fetch(RouteUser.Login).options({ requestData: stateLogin.change })
        return;
      case "reset":
        navigate('/reset');
        break;
      case "registre":
        navigate('/registre');
        break;
      case "back":
        navigate('/');
        break;
      default:
        break;;
    }
  };

  return (
    <div>
      {success && <Success />}
      <Form
        handleChangeLogin={handleChangeLogin}
        handleClickLogin={handleClickLogin}
        stateLogin={stateLogin}
        statusUserMutations={statusUserMutation} />
    </div>
  )
}

export default Login;

