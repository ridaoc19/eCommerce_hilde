import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, PayloadDashboard, permitsRoles, StateDashboard, TypeDashboard } from '../../../interfaces/user.interface';
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
        setStateDashboard({ ...stateDashboard, account: payload as StateDashboard[TypeDashboard.DASHBOARD_ACCOUNT] })
        return;
      case TypeDashboard.DASHBOARD_COMPONENTS:
        setStateDashboard({ ...stateDashboard, component: payload as StateDashboard[TypeDashboard.DASHBOARD_COMPONENTS] })
        return;
      case TypeDashboard.DASHBOARD_PERMITS:
        setStateDashboard({ ...stateDashboard, permits: payload as StateDashboard[TypeDashboard.DASHBOARD_PERMITS] })
        return;
      case TypeDashboard.DASHBOARD_LOGIN:
        let payloadValue = payload as StateDashboard[TypeDashboard.DASHBOARD_LOGIN]
        const { errors, isLoading, isLogin, isSuccess, user } = payloadValue;
        if ((!isLoading && !isLogin && !isSuccess && errors.length === 0)) return
        const token = localStorage.token
        if (!isLogin && isSuccess && !isLoading && !stateDashboard.login.isSuccess) { //login
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
              setStateDashboard({ ...stateDashboard, login: { ...stateDashboard.login, errors: [{ field: 'email', message: `${user.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${user.email}` }] } })
              setTimeout(() => {
                clearUser({ pathname: '/' })
              }, 10000);
              return
            }
          } else {
            setStateDashboard({ ...stateDashboard, login: { ...payloadValue, isLogin: false } })
            return navigate('/change');
          }
        } else { // actualización de is y error
          setStateDashboard(prevState => ({ ...prevState, login: { ...prevState.login, errors: [...prevState.login.errors, ...errors], isLoading } }))
        }
        return;

      case TypeDashboard.DASHBOARD_LOGOUT:
        return clearUser({ pathname: '/' })

      case TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR:
        // login.errors.filter((_e, i) => i !== indexError) 
        // 
        let { field } = payload as PayloadDashboard[TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR]
        const updateError = stateDashboard.login.errors.filter(e => e.field !== field)
        if (stateDashboard.login.errors.length > 0) {
          setStateDashboard({ ...stateDashboard, login: { ...stateDashboard.login, errors: updateError } })
        }
        return
      default:
        break;
    }
  }

  return { stateDashboard, dispatchDashboard, clearUser };
}

export default StateContextDashboard;