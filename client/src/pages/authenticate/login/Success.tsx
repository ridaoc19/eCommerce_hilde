import React, { MouseEventHandler } from "react";
import Svg from "../../../components/assets/Svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearUser, selectUserData } from "../../../redux/reducers/user";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const dataUser = useAppSelector(selectUserData);

  // if (!dataUser) {
  //   navigate("/login");
  // }

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="login__success--container">
        {/* {Svg({ type: "success", height: 34, width: 34 })} */}
        <h2>¡Inicio de sesión exitoso!</h2>
        <p>
          Hola <span>{dataUser?.name}</span>,Te damos la bienvenida de vuelta a nuestro sitio web.
        </p>
    </div>
  );
}

export default Success;
