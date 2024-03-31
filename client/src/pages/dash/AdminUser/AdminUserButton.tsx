import { Dispatch, SetStateAction, useContext } from "react";
import Button from "../../../components/common/button/Button";
import { CreateContext } from "../../../hooks/useContext";
import useModalConfirm from "../../../hooks/useModalConfirm/useModalConfirm";
import useMutationUser from "../../../hooks/useMutationUser";
import { TypeDashboard } from "../../../interfaces/user.interface";
import { RouteUser } from "../../../services/user/userRequest";
import { initialStateUserAdmin, InitialStateUserAdmin } from "./AdminUser";
import Spinner from "../../../components/common/spinner";

interface AdminUserButtonProps {
  setStateUserAdmin: Dispatch<SetStateAction<InitialStateUserAdmin>>
  stateUserAdmin: InitialStateUserAdmin
}

function AdminUserButton({ setStateUserAdmin, stateUserAdmin }: AdminUserButtonProps) {
  const { dashboard: { dispatchDashboard, stateDashboard: { login } } } = useContext(CreateContext)
  const { ModalComponent, closeModal, openModal } = useModalConfirm();
  const { tools } = useMutationUser();


  return (
    <>
      {ModalComponent}
      <Button
        button={{
          type: 'dark',
          text: login.isLoading ? (<Spinner />) : 'Actualizar',
          disabled: login.isLoading || !stateUserAdmin.change.roles ||
            stateUserAdmin.change.roles === login.userAll.find(u => u.user_id === stateUserAdmin.change.user_id)?.roles
          ,
          handleClick: () => {
            openModal(
              (<div>
                <h3>¡{login.user.name}!</h3>
                <p>{`Deseas actualizar los roles de ${stateUserAdmin.change.name} ${stateUserAdmin.change.lastName}?`}</p>
              </div>),
              () => tools.fetch(RouteUser.AccountAdminPut).options({ requestData: { roles: stateUserAdmin.change.roles }, routeId: stateUserAdmin.change.user_id }),
              () => closeModal()
            )
          }
        }}
      />
      <Button
        button={{
          type: 'dark',
          text: login.isLoading ? (<Spinner />) : 'Eliminar',
          disabled: login.isLoading || !stateUserAdmin.change.user_id ||
            !(stateUserAdmin.change.roles === login.userAll.find(u => u.user_id === stateUserAdmin.change.user_id)?.roles),
          handleClick: () => {
            openModal(
              (<div>
                <h3>¡{login.user.name}!</h3>
                <p>{`Quieres eliminar el usuario de ${stateUserAdmin.change.name} ${stateUserAdmin.change.lastName}?`}</p>
              </div>)
              ,
              () => tools.fetch(RouteUser.AccountAdminDelete).options({ routeId: stateUserAdmin.change.user_id }),
              () => closeModal()
            )

          }
        }}
      />
      <Button
        button={{
          type: 'light',
          text: 'Limpiar',
          disabled: login.isLoading || !stateUserAdmin.change.user_id,
          handleClick: () => {
            setStateUserAdmin(initialStateUserAdmin)
            dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGIN_DELETE_USER_ALL, payload: '' })
          }
        }}
      />

    </>
  );
}

export default AdminUserButton;