import { useContext } from 'react';
import Svg from '../../../../components/assets/icons/Svg';
import { CreateContext } from '../../../../hooks/useContext';

function Render() {
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { user } = getUserQueryData()
  const { dashboard: { stateDashboard: { login: { user } } } } = useContext(CreateContext)


  return (
    <div className='account-information__main-render'>
      <div>
        {Svg({ type: "user", width: 16, height: 16 })}
        <span>{user?.name} {user?.lastName}</span>
      </div>
      <div>
        {Svg({ type: "email", width: 16, height: 16 })}
        <span>{user?.email}</span>
      </div>
      <div>
        {Svg({ type: "phone", width: 16, height: 16 })}
        <span>{user?.phone}</span>
      </div>
    </div>
  );
}

export default Render;