import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Input from "../../../components/common/Input/Input";
import { CreateContext } from "../../../hooks/useContext";
import useMutationUser from "../../../hooks/useMutationUser";
import { IUser, TypeDashboard } from "../../../interfaces/user.interface";
import { RouteUser } from "../../../services/user/userRequest";
import { InitialStateUserAdmin } from "./AdminUser";

interface SearchUserProps {
  setStateUserAdmin: Dispatch<SetStateAction<InitialStateUserAdmin>>
  stateUserAdmin: InitialStateUserAdmin
}

function SearchUser({ setStateUserAdmin, stateUserAdmin }: SearchUserProps) {
  const { dashboard: { dispatchDashboard, stateDashboard: { login: { userAll } } } } = useContext(CreateContext)
  const [searchUser, setSearchUser] = useState<string>('')
  const { tools } = useMutationUser()

  useEffect(() => {
    !stateUserAdmin.change.name && setSearchUser('')
  }, [stateUserAdmin.change.name])

  return (
    <>
      <div className="admin-user__search-input">
        <Input
          svg={{ type: 'user' }}
          styleClass={`admin-user__search-input-text`}
          errorMessage={""}
          input={{
            type: 'user',
            placeholder: 'Ingrese usuario',
            handleOnChange: (event) => {
              event.target.value.length >= 2 && tools.fetch(RouteUser.AccountAdminGet).options({ routeId: event.target.value })
              event.target.value.length <= 3 && dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGIN_DELETE_USER_ALL, payload: '' })
              setStateUserAdmin(prevState => ({ ...prevState, change: IUser.userDataEmpty }))
              setSearchUser(event.target.value)
            },
            name: 'user',
            value: searchUser
          }}
        />
      </div>

      {!stateUserAdmin.change.name && <div className="admin-user__search-list">
        <ul className="admin-user__search-list-ul">
          {userAll.map(user => {
            return (
              <li
                key={user.user_id}
                className={`admin-user__search-list-ul-li ${stateUserAdmin.change.user_id === user.user_id ? 'selected' : ''}`}
                onClick={() => {
                  setStateUserAdmin(prevState => ({ ...prevState, change: user }))
                }
                  // onClick={() => setStateUserAdmin(prevState => ({ ...prevState, change: { user_id: user.user_id, roles: user.roles } }))
                }>
                <span>{user.name} {user.lastName}</span>
                <span> {user.email}</span>
              </li>
            )
          })}
        </ul>
      </div>}
    </>
  );
}

export default SearchUser;