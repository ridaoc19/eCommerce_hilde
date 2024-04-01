import { useParams } from "react-router-dom";
import Button from "../../../../components/common/button/Button";
import useMutationUser from "../../../../hooks/useMutationUser";
import { RouteUser } from "../../../../services/user/userRequest";
import Svg from "../../../../components/assets/icons/Svg";
import { useContext, useEffect } from "react";
import { CreateContext } from "../../../../hooks/useContext";

function VerifyEmail() {
  const { dashboard: { stateDashboard: { login }, clearUser } } = useContext(CreateContext)
  const { tools } = useMutationUser();
  const { id } = useParams();

  useEffect(() => {
    if (login.errors.length > 0) return clearUser({ pathname: '/login' })
    // eslint-disable-next-line
  }, [login.errors])

  return (
    <div className="verify-email-container">
      <header className="verify-email-title">
        {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
        <h2>¡Bienvenido!</h2>
        <p>Valida el correo electrónico</p>
      </header>
      <Button
        button={{
          type: 'dark',
          text: 'Validar',
          handleClick: () => tools.fetch(RouteUser.Verify).options({ requestData: { tokenEmail: id || "" } })
        }}
        className="verify-email-button"
      />
    </div>
  );
}

export default VerifyEmail;
