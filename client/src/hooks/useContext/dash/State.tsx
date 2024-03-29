import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, keyDashboard, PayloadDashboard, permitsRoles, StateDashboard, TypeDashboard } from '../../../interfaces/user.interface';
import useMutationUser from '../../useMutationUser';

export const initialStateDashboard: StateDashboard = {
  account: '',
  component: 'user',
  permits: {
    super: false,
    admin: false,
    edit: false,
    visitant: false,
  },
  login: {
    status: "",
    isLogin: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    user: IUser.userDataEmpty,
    errors: [],
    userAll: []
  }
};

function StateContextDashboard() {
  const navigate = useNavigate()
  const { tools: { removeQuery, removeAllQueries } } = useMutationUser();
  const [stateDashboard, setStateDashboard] = useState<StateDashboard>(initialStateDashboard);

  function clearUser({ pathname }: { pathname: `/${string}` }) {
    localStorage.removeItem("token");
    removeQuery()
    removeAllQueries()
    navigate(pathname)
    setStateDashboard(initialStateDashboard)
  }

  function dispatchDashboard<T extends TypeDashboard>({ type, payload }: { type: T, payload: PayloadDashboard[T] }): void {
    switch (type) {
      case TypeDashboard.DASHBOARD_ACCOUNT:
        setStateDashboard({ ...stateDashboard, account: payload as StateDashboard[keyDashboard.DASHBOARD_ACCOUNT] })
        return;
      case TypeDashboard.DASHBOARD_COMPONENTS:
        setStateDashboard({ ...stateDashboard, component: payload as StateDashboard[keyDashboard.DASHBOARD_COMPONENTS] })
        return;
      case TypeDashboard.DASHBOARD_PERMITS:
        setStateDashboard({ ...stateDashboard, permits: payload as StateDashboard[keyDashboard.DASHBOARD_PERMITS] })
        return;
      case TypeDashboard.DASHBOARD_LOGIN:
        let payloadValue = payload as StateDashboard[keyDashboard.DASHBOARD_LOGIN]
        const { errors, isError, isLoading, isLogin, isSuccess, user } = payloadValue;
        if ((!isError && !isLoading && !isLogin && !isSuccess)) return
        const token = localStorage.token
        if (!isLogin && isSuccess && !isLoading && !stateDashboard[keyDashboard.DASHBOARD_LOGIN].isSuccess) { //login
          if (user.verified) {// usuario sin verificar
            if (user.verifiedEmail) {// usuario sin confirmar correo
              if (!token) localStorage.token = user.token;
              const updatedPermits = permitsRoles.reduce((acc, item) => { // verifica los roles que tiene el usuario
                const hasRole = user.roles.includes(item.id);
                return { ...acc, [item.id]: hasRole };
              }, {}) as StateDashboard['permits'];
              setStateDashboard({ ...stateDashboard, login: { ...payloadValue, isLogin: true }, permits: updatedPermits })
              return navigate('/')

            } else { // el usuario no ha confirmado correo
              setStateDashboard({ ...stateDashboard, login: { ...stateDashboard.login, isError: true, errors: [{ field: 'email', message: `${user.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${user.email}` }] } })
              setTimeout(() => {
                clearUser({ pathname: '/' })
              }, 10000);
              return
            }
          } else {
            setStateDashboard({ ...stateDashboard, login: { ...payloadValue, isLogin: false } })
            return navigate('/change');
          }

        } else if (!isLogin && token && !isLoading && stateDashboard[keyDashboard.DASHBOARD_LOGIN].isSuccess) { // cerrar sesión
        } else { // actualización de is y error
          setStateDashboard(prevState => ({ ...prevState, login: { ...prevState.login, errors: [...prevState.login.errors, ...errors], isError: prevState.login.isError ? true : isError, isLoading } }))
        }
        return;

      case TypeDashboard.DASHBOARD_LOGOUT:
        return clearUser({ pathname: '/' })

      case TypeDashboard.DASHBOARD_LOGIN_UPDATE_ERROR:
        let payloadValueError = payload as StateDashboard[keyDashboard.DASHBOARD_LOGIN]
        return setStateDashboard({ ...stateDashboard, login: { ...stateDashboard.login, isError: payloadValueError.isError, errors: payloadValueError.errors } })
      default:
        break;
    }
  }

  return { stateDashboard, dispatchDashboard, clearUser };
}

export default StateContextDashboard;