import { useState } from "react";
import useValidations from "../../../hooks/useValidations/useValidations";
import { handleSelectChange } from "../../../interfaces/global.interface";
import { IUser, permitsRoles } from "../../../interfaces/user.interface";
import AdminUserButton from "./AdminUserButton";
import SearchUser from "./SearchUser";
import SelectedUser from "./SelectedUser";

export enum UserAdminButtonName {
  Save = 'save',
  Empty = 'empty',
  Delete = 'delete'
}

export type InitialStateUserAdmin = {
  change: IUser.UserData
  error: { roles: string }
}

export const initialStateUserAdmin: InitialStateUserAdmin = {
  change: IUser.userDataEmpty,
  error: { roles: "" }
}

function AdminUser() {
  const { getValidationErrors } = useValidations();
  const [stateUserAdmin, setStateUserAdmin] = useState<InitialStateUserAdmin>(initialStateUserAdmin)

  const handleChangeUserAdmin: handleSelectChange = ({ target: { name, value } }) => {
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateUserAdmin(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateUserAdmin(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  return (
    <div className="admin-user">
      <div className="admin-user__">
        <div className="admin-user__title">
          <h3>Administración de usuarios</h3>
        </div>

        <div className="admin-user__search">
          <SearchUser setStateUserAdmin={setStateUserAdmin} stateUserAdmin={stateUserAdmin} />
        </div>

        <div className="admin-user__selected">
          <SelectedUser stateUserAdmin={stateUserAdmin} />
        </div>



        <div className="admin-user__select">
          <label htmlFor="roles">Roles:</label>
          <select id="roles" disabled={!stateUserAdmin.change.roles} name="roles" value={stateUserAdmin.change.roles} onChange={handleChangeUserAdmin}>
            {permitsRoles.map(item => <option key={item.id} value={item.id}>{item.id}</option>)}
          </select>
        </div>

        <div className="admin-user__button">
          <AdminUserButton setStateUserAdmin={setStateUserAdmin} stateUserAdmin={stateUserAdmin} />
        </div>
      </div>
    </div>
  );
}

export default AdminUser;