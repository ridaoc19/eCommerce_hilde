import { useContext } from "react";
import { CreateContext } from "../../../../../hooks/useContext";
import useQueryUser from "../../../../../hooks/useQueryUser";
import { handleSelectChange } from "../../../../../interfaces/global.interface";
import { RequestMapUser } from "../../../../../services/user/userRequest";
import { HandleClick, RouteUser, Spinner, useState, useValidations } from "../../../../auth/login";

export enum UserAdminButtonName {
  Save = 'save',
  Empty = 'empty',
  Delete = 'delete'
}

type InitialStateUserAdmin = {
  change: RequestMapUser[RouteUser.AccountAdminPut]['requestData']
  error: { roles: string }
}

const initialStateUserAdmin: InitialStateUserAdmin = {
  change: { user_id: "", roles: "" },
  error: { roles: "" }
}

function AdminUser() {
  const { getValidationErrors } = useValidations();
  const { statusUserQuery: { dataSuccess } } = useQueryUser(RouteUser.AccountAdminGet, {}, true)
  // const { tools, status } = useMutationUser()
  const { dashboard: { stateDashboard: { login } } } = useContext(CreateContext)


  const [stateUserAdmin, setStateUserAdmin] = useState<InitialStateUserAdmin>(initialStateUserAdmin)

  const handleChangeUserAdmin: handleSelectChange = ({ target: { name, value } }) => {
    // clearUserError(() => tools.resetError(), (state) => setStateUserAdmin(state), initialStateUserAdmin, stateUserAdmin)
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateUserAdmin(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateUserAdmin(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickUserAdmin: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as UserAdminButtonName;
    if (id === UserAdminButtonName.Save) {
      // tools.fetch(RouteUser.AccountAdminPut).options({ requestData: stateUserAdmin.change })
    } else if (id === UserAdminButtonName.Empty) {
      setStateUserAdmin(initialStateUserAdmin)
    } else {
      // tools.fetch(RouteUser.AccountAdminDelete).options({ routeId: stateUserAdmin.change.user_id })
    }
  }


  return (
    <div className="user-admin__form--container">
      <div className="title">
        <h3>Administración de usuarios</h3>
      </div>

      <ul className="list">
        {dataSuccess?.data.map(user => {

          return (
            <li key={user.user_id} style={stateUserAdmin.change.user_id === user.user_id ? { color: 'blue' } : { color: 'black' }} onClick={() => {
              setStateUserAdmin(prevState => ({ ...prevState, change: { user_id: user.user_id, roles: user.roles } }))
            }}>
              <span>{user.name} {user.lastName}</span>
              <span> {user.email}</span>
            </li>
          )
        })}
      </ul>

      <div className="form__input--content">

        <label htmlFor="roles">Roles:</label>
        <select id="roles" disabled={!stateUserAdmin.change.roles} name="roles" value={stateUserAdmin.change.roles} onChange={handleChangeUserAdmin}>
          <option value="">Selecciona</option>
          <option value="super">Super</option>
          <option value="admin">Admin</option>
          <option value="edit">Edit</option>
          <option value="visitant">Visitant</option>
        </select>
        {login?.errors.some(e => e.field === 'roles') &&
          login?.errors.filter(e => e.field === 'roles').map((e, i) => (
            <span key={i}>{e.message}</span>
          ))
        }

      </div>
      <div>

      </div >

      <div className="form__error-back--content">
        {login?.errors.some(e => e.field === 'general') &&
          <ul>
            {login?.errors.filter(e => e.field === 'general').map((e, i) => (
              <span key={i}>{e.message}</span>
            ))}
          </ul>
        }
      </div>

      <div className="form__button--content">
        <button id='button__user-admin--save' onClick={handleClickUserAdmin} className="button_dark" disabled={login.isLoading || login.isError || !stateUserAdmin.change.roles || stateUserAdmin.change.roles === dataSuccess?.data.find(u => u.user_id === stateUserAdmin.change.user_id)?.roles} >{login.isLoading ? <Spinner /> : "Actualizar"}</button>
        <button id='button__user-admin--empty' onClick={handleClickUserAdmin} className="button_dark" disabled={login.isLoading || login.isError} >{"Limpiar"}</button>
        <button id='button__user-admin--delete' onClick={handleClickUserAdmin} className="button_dark" disabled={login.isLoading || login.isError || !stateUserAdmin.change.user_id} >{login.isLoading ? <Spinner /> : "Eliminar Usuario"}</button>
      </div>
    </div>
  );
}

export default AdminUser;