import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { Svg } from '../../../auth/login';

function Render() {
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { user } = getUserQueryData()
  const { dashboard: { stateDashboard: { login: {user} } } } = useContext(CreateContext)


  return (
    <div>
      <div>
        {Svg({ type: "user" })}
        <span>{user?.name} {user?.lastName}</span>
      </div>
      <div>
        {Svg({ type: "email" })}
        <span>{user?.email}</span>
      </div>
      <div>
        {Svg({ type: "phone" })}
        <span>{user?.phone}</span>
      </div>
    </div>
  );
}

export default Render;