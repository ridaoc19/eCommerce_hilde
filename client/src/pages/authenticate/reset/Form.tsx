import { MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropsUseChange } from '../../../components/hooks/useOnChange';
import { validationClick } from '../../../components/utils/validation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserData, selectUserError } from '../../../redux/reducers/user';
import { changePosts, loginReset } from '../../../redux/reducers/user/actions';
import Input from '../../../styles/content/input/Input';

interface Props {
  handleOnChange: (data: { name: string; value: string; }) => void;
  change: PropsUseChange
}


function Form({ change, handleOnChange }: Props) {
  const { email } = change
  const navigate = useNavigate();
  const errorBack = useAppSelector(selectUserError)
  const dataUser = useAppSelector(selectUserData)
  const dispatch = useAppDispatch();


  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "save":
        const { dataPost, authorize } = validationClick({ change, handleOnChange })
        // dispatch(fetchPosts({name: name.change, lastName: lastName.change, email: email.change}));
        if (authorize) {
          dispatch(loginReset(dataPost));
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
    <div className="reset__form--container">
      <div className="reset__form--content">

        <header className="form__header--content">
          <h2>Recuperar contraseña</h2>
          <p>Ingresa el correo electrónico que tienes registrado</p>
        </header>

        <main>
          <div className="form__input--content">
            <Input svg={{ type: "email" }} styleClass="login_email" errorMessage={email.message}
              input={{ type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange, name: "email" }}
            />
          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__reset--save' onClick={handleOnClick} className="button_dark"  >Restablecer contraseña</button>
            <hr />
            <button id='button__reset--back' onClick={handleOnClick} className="button_light"  >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;