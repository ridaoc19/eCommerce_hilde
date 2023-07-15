import { MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropsUseChange } from '../../../components/hooks/useOnChange';
import { validationClick } from '../../../components/utils/validation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserData, selectUserError } from '../../../redux/reducers/user';
import { changePosts } from '../../../redux/reducers/user/actions';
import Input from '../../../styles/content/input/Input';

interface Props {
  handleOnChange: (data: { name: string; value: string; }) => void;
  change: PropsUseChange
}


function Form({ change, handleOnChange }: Props) {
  const { password, confirmPassword } = change
  const navigate = useNavigate();
  const errorBack = useAppSelector(selectUserError)
  const dataUser = useAppSelector(selectUserData)
  const dispatch = useAppDispatch();


  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "change":
        const { dataPost, authorize } = validationClick({ change, handleOnChange })
        // dispatch(fetchPosts({name: name.change, lastName: lastName.change, email: email.change}));
        if (authorize) {
          dispatch(changePosts(Object.assign(dataPost, {_id: dataUser?._id})));
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
    <div className="login__form--container">
      <div className="login__form--content">

        <header className="form__header--content">
          <h2>Cambio de Contraseña</h2>
          <p>Restablece tu contraseña para acceder a tu cuenta</p>
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
            {typeof errorBack === "string" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__login--change' onClick={handleOnClick} className="button_dark"  >Cambiar contraseña</button>
            <hr />
            <button id='button__login--back' onClick={handleOnClick} className="button_light"  >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;