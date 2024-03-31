import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateContext, IContextData } from '../../../hooks/useContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { HandleClick } from '../../../interfaces/global.interface';
import { TypeDashboard } from '../../../interfaces/user.interface';
import Svg from '../../assets/icons/Svg';
import Button from '../button/Button';

function Login() {


  const navigate = useNavigate()
  const { mediaQuery } = useMediaQuery();
  const { dashboard: { dispatchDashboard, stateDashboard: { login } } }: IContextData = useContext(CreateContext);
  // const { data: { getUserQueryData } } = useMutationUser()
  // const { userData, } = getUserQueryData()
  const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false)

  const handleOnClick: HandleClick = (event) => {
    event.preventDefault();
    dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGOUT, payload: { isLogin: false } })
  }

  // useEffect(() => {
  //   if (userData) {
  //     if (userData.verified) {
  //       permitsRoles.forEach(acc => {
  //         if (acc.roles.some(r => r.includes(userData.roles))) {
  //           // dispatchContext({ type: ActionTypeDashboard.PERMITS_ROLES, payload: { name: null, value: acc.id } })
  //         }
  //       });
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [isFetchingUser])

  return (
    <div className='navbar__login-container'>
      <button className='navbar__login-content'
        onClick={(event) => {
          event.preventDefault()
          login.user.email ? setIsOpenModalLogin(true) : navigate('/login')
        }}
      >

        <div className='navbar__login-logo'>
          {Svg({ type: 'user', color: "white", height: 20, width: 20 })}
        </div>
        {mediaQuery !== 'phone' && <div className='navbar__login-text'>
          <div>
            <span>{login.user.name ? `!Hola¡ ${login.user.name}` : 'Inicia sesión'}</span>
          </div>
        </div>}

      </button>

      <div onClick={(event) => {
        event.preventDefault()
        setIsOpenModalLogin(false)
      }} className={`navbar__login-modal ${isOpenModalLogin ? 'isOpenModalLogin' : ''}`}>
        <div className='navbar__login-modal-container'>
          <div className='navbar__login-modal-content'>
            {login.user.name &&
              <ul>
                <li>
                  <Button
                    button={{
                      type: 'highlighter',
                      text: 'Dashboard',
                      handleClick: () => {
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