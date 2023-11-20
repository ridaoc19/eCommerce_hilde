import Svg from '../../../../assets/icons/Svg';
import { useMutationUser } from '../../../auth/login';

function Render() {
  const { fetchUserMutation: { getQueryUser } } = useMutationUser();
  const { dataUser } = getQueryUser()

  return (
    <div>
      <div>
        {Svg({ type: "user" })}
        <span>{dataUser?.name} {dataUser?.lastName}</span>
      </div>
      <div>
        {Svg({ type: "email" })}
        <span>{dataUser?.email}</span>
      </div>
      <div>
        {Svg({ type: "phone" })}
        <span>{dataUser?.phone}</span>
      </div>
    </div>
  );
}

export default Render;