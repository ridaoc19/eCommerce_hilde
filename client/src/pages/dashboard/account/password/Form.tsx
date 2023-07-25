import { MouseEventHandler } from 'react';
import { IUser } from '../../../../components/utils/interface/user';
import { validationClick } from '../../../../components/utils/validation';
import { useAppDispatch } from '../../../../redux/hooks';
import { userPosts } from '../../../../redux/reducers/user/actions';
import Input from '../../../../styles/content/input/Input';
import Loading from '../../../../styles/content/loading';
import Success from './Success';

function Form({ handleOnChange, change, errorBack, status }: IUser.PropsForm) {
  const dispatch = useAppDispatch();
  const { confirmPassword, password } = change;

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const { dataPost, authorize } = validationClick({ change, handleOnChange, routes: 'account' })

    if (authorize) dispatch(userPosts(Object.assign(dataPost, { components: "password" })));
    // dispatch(clearUser());
  };

  return (
    <div className="dashboard__user-form--container">
      <div className="dashboard__user-form--content">
        {status === "successP" && <Success />}

        <main>

          <div className="user-form__input--content">

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
            {typeof errorBack === "string" && status === "errorP" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__dashboard--save' onClick={handleOnClick} className="button_dark" disabled={status === "loadingP" || status === "successP"} >{status === "loadingP" ? <Loading /> : "Guardar nueva contraseña"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;


