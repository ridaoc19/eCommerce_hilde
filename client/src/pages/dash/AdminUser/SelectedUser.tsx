import { InitialStateUserAdmin } from "./AdminUser";

function SelectedUser({ stateUserAdmin }: { stateUserAdmin: InitialStateUserAdmin }) {
  return (
    <ul>
      {Object.entries(stateUserAdmin.change).map(([key, value]) => {
        if (key === 'token') return null
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); // Convierte la primera letra en mayúscula
        return (
          <li key={key}><b>{capitalizedKey}:</b> <i>{!!value && value.toString()}</i></li>
        );
      })}
    </ul>

  );
}

export default SelectedUser;