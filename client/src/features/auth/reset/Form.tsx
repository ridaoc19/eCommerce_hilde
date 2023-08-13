import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import { IUser, IUserComponents } from '../../../interfaces/user.interface';
import { useAppDispatch } from '../../../redux/hooks';
import { clearUser } from '../../../redux/reducers/user';
import { userPosts } from '../../../redux/reducers/user/actions';
import { userValidationClick } from '../../../utils/validations/userValidation';
import Success from './Success';


function Form({ change, handleOnChange, status, errorBack }: IUserComponents.FormProps) {
  const { email } = change
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "save":
        const { dataPost, authorize } = userValidationClick({ change, handleOnChange, routes: 'reset' })
        if (authorize) dispatch(userPosts(dataPost as IUser.resetData));
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
    <div className="reset__form--container">
      <div className="reset__form--content">

        <header className="form__header--content">
          {status === "success" && <Success />}
          <h2>Recuperar contraseña</h2>
          <p>Ingresa el correo electrónico que tienes registrado</p>
        </header>

        <main>
          <div className="form__input--content">
            <UserInput svg={{ type: "email" }} styleClass="login_email" errorMessage={email.message}
              input={{ type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange, name: "email" }}
            />
          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__reset--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Spinner /> : "Restablecer contraseña"}</button>
            <hr />
            <button id='button__reset--back' onClick={handleOnClick} className="button_light" disabled={status === "loading" || status === "success"} >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;