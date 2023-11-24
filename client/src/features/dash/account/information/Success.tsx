import { useMutationUser } from "../../../auth/login";

function Success() {
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

  return (
    <div className="account__success--container">
      <div>
        <h2>¡Tus datos personales han sido actualizados!</h2>
        <p>
          ¡Hola <span>{userData?.name}</span>! La actualización de tus datos ha sido exitosa.
        </p>
        {!userData?.verifiedEmail && (
          <p>
            Si cambias tu correo, recibirás un enlace para verificarlo. Si no lo verificas en 10 minutos, seguirás usando tu correo actual y no podrás iniciar sesión hasta que lo hagas.
          </p>
        )}
      </div>
    </div>
  );
}

export default Success;
