import useQueryUser from "../../../../../hooks/useQueryUser";
import { handleSelectChange } from "../../../../../interfaces/global.interface";
import { RequestMapUser } from "../../../../../services/userRequest";
import { HandleClick, RouteUser, Spinner, clearUserError, useMutationUser, useState, useValidations } from "../../../../auth/login";

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
  change: { _id: "", roles: "" },
  error: { roles: "" }
}

function AdminUser() {
  const { getValidationErrors } = useValidations();
  const { statusUserQuery: { dataSuccess } } = useQueryUser(RouteUser.AccountAdminGet, {}, true)
  const { tools, status } = useMutationUser()

  const [stateUserAdmin, setStateUserAdmin] = useState<InitialStateUserAdmin>(initialStateUserAdmin)

  const handleChangeUserAdmin: handleSelectChange = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateUserAdmin(state), initialStateUserAdmin, stateUserAdmin)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateUserAdmin(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateUserAdmin(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickUserAdmin: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as UserAdminButtonName;
    if (id === UserAdminButtonName.Save) {
      tools.fetch(RouteUser.AccountAdminPut).options({ requestData: stateUserAdmin.change })
    } else if (id === UserAdminButtonName.Empty) {
      setStateUserAdmin(initialStateUserAdmin)
    } else {
      tools.fetch(RouteUser.AccountAdminDelete).options({ routeId: stateUserAdmin.change._id })
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
            <li key={user._id} style={stateUserAdmin.change._id === user._id ? { color: 'blue' } : { color: 'black' }} onClick={() => {
              setStateUserAdmin(prevState => ({ ...prevState, change: { _id: user._id, roles: user.roles } }))
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
        {status.userError?.errors.some(e => e.field === 'roles') &&
          status.userError?.errors.filter(e => e.field === 'roles').map((e, i) => (
            <span key={i}>{e.message}</span>
          ))
        }

      </div>
      <div>

      </div >

      <div className="form__error-back--content">
        {status.userError?.errors.some(e => e.field === 'general') &&
          <ul>
            {status.userError?.errors.filter(e => e.field === 'general').map((e, i) => (
              <span key={i}>{e.message}</span>
            ))}
          </ul>
        }
      </div>

      <div className="form__button--content">
        <button id='button__user-admin--save' onClick={handleClickUserAdmin} className="button_dark" disabled={status.isLoadingUser || status.isUserError || !stateUserAdmin.change.roles || stateUserAdmin.change.roles === dataSuccess?.data.find(u => u._id === stateUserAdmin.change._id)?.roles} >{status.isLoadingUser ? <Spinner /> : "Actualizar"}</button>
        <button id='button__user-admin--empty' onClick={handleClickUserAdmin} className="button_dark" disabled={status.isLoadingUser || status.isUserError} >{"Limpiar"}</button>
        <button id='button__user-admin--delete' onClick={handleClickUserAdmin} className="button_dark" disabled={status.isLoadingUser || status.isUserError || !stateUserAdmin.change._id} >{status.isLoadingUser ? <Spinner /> : "Eliminar Usuario"}</button>
      </div>
    </div>
  );
}

export default AdminUser;