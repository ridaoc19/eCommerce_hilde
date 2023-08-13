import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import { IUser, IUserComponents } from '../../../interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserData } from '../../../redux/reducers/user';
import { userPosts } from '../../../redux/reducers/user/actions';
import { userValidationClick } from '../../../utils/validations/userValidation';


function Form({ change, handleOnChange, status, errorBack }: IUserComponents.FormProps) {
  const { password, confirmPassword } = change
  const navigate = useNavigate();
  const dataUser = useAppSelector(selectUserData)!
  const dispatch = useAppDispatch();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "save":
        const { dataPost: data, authorize } = userValidationClick({ change, handleOnChange, routes: 'change' })
        if (dataUser?._id) {
          if (authorize) dispatch(userPosts(Object.assign(data, { _id: dataUser._id }) as IUser.passChangeData));
        }
        return;
      case "back":
        navigate('/login');
        break;
      default:
        break;;
    }
    dispatch(clearUser());
  };

  return (
    <div className="pass-change__form--container">
      <div className="pass-change__form--content">

        <header className="form__header--content">
          <h2>Cambio de Contraseña</h2>
          <p>Cambia tu contraseña para acceder a tu cuenta</p>
        </header>

        <main>
          <div className="form__input--content">
            <UserInput
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="registre--password" errorMessage={password.message}
              input={{ name: "password", type: "password", placeholder: "Contraseña", value: password.change, handleOnChange }}
            />

            <UserInput
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="registre--confirmPassword" errorMessage={confirmPassword.message}
              input={{ name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña", value: confirmPassword.change, handleOnChange }}
            />

          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__pass-change--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Spinner /> : "Cambiar contraseña"}</button>
            <hr />
            <button id='button__pass-change--back' onClick={handleOnClick} className="button_light" disabled={status === "loading" || status === "success"} >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;