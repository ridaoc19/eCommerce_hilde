import { useAppSelector } from "../../../../redux/hooks";
import { selectUserData } from "../../../../redux/reducers/user";

function Success() {
  const dataUser = useAppSelector(selectUserData);

  return (
    <div className="account__success--container">
      <div>
        <h2>¡Contraseña cambiada exitosamente!</h2>
        <p>
          ¡Hola <span>{dataUser?.name}</span>! Tu contraseña ha sido actualizada con éxito.
        </p>
      </div>
    </div>
  );
}

export default Success;
