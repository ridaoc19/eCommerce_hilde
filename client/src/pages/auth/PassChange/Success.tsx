import Button from '../../../components/common/button/Button';
import { HandleClick, Svg, useMutationUser, useNavigate } from './index';

function Success() {
  const { tools, data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()
  const navigate = useNavigate();

  const handleOnClick: HandleClick = (event) => {
    event.preventDefault();
    tools.removeQuery()
    navigate("/login");
  };

  return (
    <div className="pass-change__success--container">
      <div>
        {Svg({ type: "success", height: 164, width: 164 })}
        <h2>¡Contraseña cambiada con éxito!</h2>
        <p><span>{userData?.name}</span> a partir de ahora, puedes iniciar sesión en tu cuenta con la nueva contraseña.</p>
        <div className="success--button">
          <div>
            <Button
              button={{
                type: 'light',
                text: '¡Entendido!',
                handleClick: handleOnClick
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
