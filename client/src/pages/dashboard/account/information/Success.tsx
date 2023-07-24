import { useAppSelector } from "../../../../redux/hooks";
import { selectUserData } from "../../../../redux/reducers/user";

function Success() {
  const dataUser = useAppSelector(selectUserData);

  return (
    <div className="account__success--container">
      <div>
        <h2>¡Tus datos personales han sido actualizados!</h2>
        <p>
          ¡Hola <span>{dataUser?.name}</span>! La actualización de tus datos ha sido exitosa.
        </p>
      </div>
    </div>
  );
}

export default Success;
