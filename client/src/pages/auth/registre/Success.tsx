import { useContext } from 'react';
import Button from '../../../components/common/button/Button';
import { CreateContext } from '../../../hooks/useContext';
import { HandleClick, Svg, useNavigate } from './index';

function Success() {
  // const { tools, data: { getUserQueryData } } = useMutationUser();
  // const { userData } = getUserQueryData()
  const { dashboard: { stateDashboard: { login } } } = useContext(CreateContext)
  const navigate = useNavigate();

  const handleOnClick: HandleClick = (event) => {
    event.preventDefault();
    // tools.removeQuery()
    navigate("/login");
  };

  return (
    <div className="registre__success--container">
      <div>
        {Svg({ type: "success", height: 164, width: 164 })}
        <h2>¡Registro exitoso!</h2>
        <p>
          Hola <span>{login.user?.name}</span>, tu registro ha sido exitoso. Por
          favor, revisa tu cuenta de correo electrónico (
          <span>{login.user?.email}</span>) donde encontrarás una contraseña
          temporal que podrás utilizar para iniciar sesión. Una vez que hayas
          ingresado a tu cuenta, podrás cambiar la contraseña por una de tu
          preferencia.
        </p>
        <p>¡Disfruta de todos los beneficios de nuestra página!</p>
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
