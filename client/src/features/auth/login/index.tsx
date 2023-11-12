import { useEffect, useState } from "react";
import useMutationUser from "../../../hooks/useMutationUser";
import useValidations from "../../../hooks/useValidations";
import { HandleChangeText, HandleClick } from "../../../interfaces/global.interface";
import { IUser } from "../../../interfaces/user.interface";
import { RouteUser } from "../../../services/userRequest";
import Form from "./Form";

// const initialState: IUserOnChange.UseUserOnChange = {
//   email: { change: "", message: "" },
//   password: { change: "", message: "" },
// }

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
  // const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const fetchUser = useMutationUser();
  const [stateLogin, setStateLogin] = useState<InitialStateLogin>(initialStateLogin);
  // const navigate = useNavigate()
  // const errorBack = useAppSelector(selectUserError)
  // const loadingUser = useAppSelector(selectUserLoading)
  // const dataUser = useAppSelector(selectUserData)
  // const [status, setStatus] = useState<IUserComponents.Status>("form");

  useEffect(() => {
    if (fetchUser.statusUser.errorUser) {
      fetchUser.statusUser.errorUser.errors.forEach(({ field, message }) => {
        if (message) {
          setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, [field]: message } }))
        }
      })
    }
    // console.log(fetchUser, "todo");
  }, [fetchUser.statusUser.isErrorUser])

  // useEffect(() => {
  // if (errorBack instanceof Object) handleErrorOnBack()
  // if (errorBack) return setStatus("error")
  // if (loadingUser) return setStatus("loading")
  //   if (dataUser instanceof Object && !loadingUser && !errorBack && !localStorage.token) {
  //     if (dataUser?.verified) {
  //       if (!dataUser.verifiedEmail) {
  //         // return setStatus('form')
  //       }
  //       // setStatus("success")
  //       setTimeout(() => {
  //         return navigate('/')
  //       }, 10000);
  //       localStorage.token = dataUser.token;
  //     } else {
  //       return navigate('/change');
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [loadingUser, dataUser, errorBack])

  const handleChangeLogin: HandleChangeText = ({ target: { name, value } }) => {
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

  const handleClickLogin: HandleClick = ({ target }) => {
    console.log(target);

    // const id = (event.target as HTMLFormElement).id.split("--")[1];
    // event.preventDefault();

    // switch (id) {
    //   case "login":
    fetchUser.fetchUser.fetch(RouteUser.Login).options({ requestData: stateLogin.change })
    // fetchUser?.fetchQueryUser(RouteUser.Login).options({ requestData: initialStateLogin })
    //     return;
    //   case "reset":
    //     navigate('/reset');
    //     break;
    //   case "registre":
    //     navigate('/registre');
    //     break;
    //   case "back":
    //     navigate('/');
    //     break;
    //   default:
    //     break;;
    // }
    // dispatch(clearUser());
  };

  return (
    <div>
      <button onClick={() => fetchUser.fetchUser.removeFetch()}>eliminar data</button>
      <button onClick={() => fetchUser.fetchUser.removeError()}>reset error</button>
      <Form
        handleChangeLogin={handleChangeLogin}
        handleClickLogin={handleClickLogin}
        stateLogin={stateLogin}
        statusUser={fetchUser.statusUser} />
    </div>
  )
}

export default Login;

