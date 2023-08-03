import { MouseEventHandler } from 'react';
import Spinner from '../../../../components/common/spinner';
import UserInput from '../../../../components/common/userInput/UserInput';
import { IAuth } from '../../../../interfaces/features/auth/auth.interface';
import { useAppDispatch } from '../../../../redux/hooks';
import { userPosts } from '../../../../redux/reducers/user/actions';
import { userValidationClick } from '../../../../utils/validations/userValidation';
import Success from './Success';
import { IPassword } from '../../../../interfaces/features/dash/dash.interface';

function Form({ handleOnChange, change, errorBack, status }: IAuth.FormProps) {
  const dispatch = useAppDispatch();
  const { confirmPassword, password } = change;

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const { dataPost, authorize } = userValidationClick({ change, handleOnChange, routes: 'account' })

    if (authorize) dispatch(userPosts(Object.assign(dataPost, { components: "password" }) as IPassword.PasswordData));
    // dispatch(clearUser());
  };

  return (
    <div className="dashboard__user-form--container">
      <div className="dashboard__user-form--content">
        {status === "success" && <Success />}

        <main>

          <div className="user-form__input--content">

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
            <button id='button__dashboard--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Spinner /> : "Guardar nueva contraseña"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;


