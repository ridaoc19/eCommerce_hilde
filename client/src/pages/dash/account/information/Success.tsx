import { useContext } from "react";
import { CreateContext } from "../../../../hooks/useContext";

function Success() {
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { userData } = getUserQueryData()
  const { dashboard: { stateDashboard: { login:{user} } } } = useContext(CreateContext)


  return (
    <div className="account__success--container">
      <div>
        <h2>¡Tus datos personales han sido actualizados!</h2>
        <p>
          ¡Hola <span>{user?.name}</span>! La actualización de tus datos ha sido exitosa.
        </p>
        {!user?.verifiedEmail && (
          <p>
            Si cambias tu correo, recibirás un enlace para verificarlo. Si no lo verificas en 10 minutos, seguirás usando tu correo actual y no podrás iniciar sesión hasta que lo hagas.
          </p>
        )}
      </div>
    </div>
  );
}

export default Success;
