import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { validationClick } from '../../../components/utils/validation';
import { IUser } from '../../../interface';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserData } from '../../../redux/reducers/user';
import Input from '../../../styles/content/input/Input';
import Loading from '../../../styles/content/loading';
import { userPosts } from '../../../redux/reducers/user/actions';

function Form({ change, handleOnChange, status, errorBack }: IUser.PropsForm) {
  const { password, confirmPassword } = change
  const navigate = useNavigate();
  const dataUser = useAppSelector(selectUserData)
  const dispatch = useAppDispatch();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "save":
        const { dataPost, authorize } = validationClick({ change, handleOnChange, routes: 'change' })
        if (authorize) dispatch(userPosts(Object.assign(dataPost, { _id: dataUser?._id })));
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
    <div className="PasswordChange__form--container">
      <div className="PasswordChange__form--content">

        <header className="form__header--content">
          <h2>Cambio de Contraseña</h2>
          <p>Cambia tu contraseña para acceder a tu cuenta</p>
        </header>

        <main>
          <div className="form__input--content">
            <Input
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="registre--password" errorMessage={password.message}
              input={{ name: "password", type: "password", placeholder: "Contraseña", value: password.change, handleOnChange }}
            />

            <Input
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="registre--confirmPassword" errorMessage={confirmPassword.message}
              input={{ name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña", value: confirmPassword.change, handleOnChange }}
            />

          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__PasswordChange--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Loading /> : "Cambiar contraseña"}</button>
            <hr />
            <button id='button__PasswordChange--back' onClick={handleOnClick} className="button_light" disabled={status === "loading" || status === "success"} >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;