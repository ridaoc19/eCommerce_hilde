import { IUserComponents } from "../../../../interfaces/user.interface";
import { useAppSelector } from "../../../../redux/hooks";
import { selectUserData } from "../../../../redux/reducers/user";

function Success({ change }: Pick<IUserComponents.FormProps, 'change'>) {
  console.log(change, "tiene");

  const dataUser = useAppSelector(selectUserData);

  return (
    <div className="account__success--container">
      <div>
        <h2>¡Tus datos personales han sido actualizados!</h2>
        <p>
          ¡Hola <span>{dataUser?.name}</span>! La actualización de tus datos ha sido exitosa.
        </p>
        {!dataUser?.verifiedEmail && (
          <p>
            Si cambias tu correo, recibirás un enlace para verificarlo. Si no lo verificas en 10 minutos, seguirás usando tu correo actual y no podrás iniciar sesión hasta que lo hagas.
          </p>
        )}
      </div>
    </div>
  );
}

export default Success;
