import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateContext, IContextData } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dash/reducer';
import useMutationUser from '../../../hooks/useMutationUser';
import { HandleClick } from '../../../interfaces/global.interface';
import { permitsRoles } from '../../../interfaces/user.interface';
import Button from '../button/Button';
import Svg from '../../assets/icons/Svg';

function Login() {


  const navigate = useNavigate()
  const { dashboard: { dispatch: dispatchContext } }: IContextData = useContext(CreateContext)!;
  const { data: { getUserQueryData }, tools: { removeQuery } } = useMutationUser()
  const { userData, isFetchingUser } = getUserQueryData()
  const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false)

  const handleOnClick: HandleClick = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    removeQuery()
    dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
  }

  useEffect(() => {
    if (userData) {
      if (userData.verified) {
        permitsRoles.forEach(acc => {
          if (acc.roles.some(r => r.includes(userData.roles))) {
            dispatchContext({ type: ActionTypeDashboard.PERMITS_ROLES, payload: { name: null, value: acc.id } })
          }
        });
      }
    }
    // eslint-disable-next-line
  }, [isFetchingUser])

  return (
    <div className='navbar__login-container'>
      <button className='navbar__login-content'
        onClick={(event) => {
          event.preventDefault()
          userData?.email ? setIsOpenModalLogin(true) : navigate('/login')
        }}
      >

        <div className='navbar__login-logo'>
          {Svg({ type: 'user', color: "white", height: 20, width: 20 })}
        </div>
        <div className='navbar__login-text'>
          <div>
            <span>{userData?.name ? `!Hola¡ ${userData.name}` : 'Inicia sesión'}</span>
          </div>
        </div>

      </button>

      <div onClick={(event) => {
        event.preventDefault()
        setIsOpenModalLogin(false)
      }} className={`navbar__login-modal ${isOpenModalLogin ? 'isOpenModalLogin' : ''}`}>
        <div className='navbar__login-modal-container'>
          <div className='navbar__login-modal-content'>
            {userData?.name &&
              <ul>
                <li>
                  <Button
                    button={{
                      type: 'highlighter',
                      text: 'Dashboard',
                      handleClick: () => {
                        console.log("tiene")
                        navigate('/dashboard')
                      }
                    }}
                    svgRight={{ type: 'padlock', color: '#FFA451' }}
                  />
                </li>
                <li><Button
                  button={{
                    type: 'highlighter',
                    text: "Cerrar sesión",
                    handleClick: handleOnClick
                  }}
                  svgRight={{
                    type: 'close',
                    color: '#FFA451'
                  }}
                /></li>
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
// 9 de enero 443 323 1023 5038 72
export default Login;