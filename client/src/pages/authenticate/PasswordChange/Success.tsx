import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import Svg from "../../../components/assets/Svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearUser, selectUserData } from "../../../redux/reducers/user";

function Success() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(selectUserData);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="passwordChange__success--container">
      <div>
        {Svg({ type: "success", height: 164, width: 164 })}
        <h2>¡Contraseña cambiada con éxito!</h2>
        <p><span>{dataUser?.name}</span> a partir de ahora, puedes iniciar sesión en tu cuenta con la nueva contraseña.</p>
        <div className="success--button">
          <div>
            <button className="button_light" onClick={handleOnClick}>¡Entendido!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
