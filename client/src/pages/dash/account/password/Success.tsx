import { useContext } from "react";
import { CreateContext } from "../../../../hooks/useContext";

function Success() {
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { userData } = getUserQueryData()
  const { dashboard: { stateDashboard: { login: { user } } } } = useContext(CreateContext)

  return (
    <div className="account__success--container">
      <div>
        <h2>¡Contraseña cambiada exitosamente!</h2>
        <p>
          ¡Hola <span>{user?.name}</span>! Tu contraseña ha sido actualizada con éxito.
        </p>
      </div>
    </div>
  );
}

export default Success;
