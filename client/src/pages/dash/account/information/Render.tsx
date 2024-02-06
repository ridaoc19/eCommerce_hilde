import { Svg, useMutationUser } from '../../../auth/login';

function Render() {
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

  return (
    <div>
      <div>
        {Svg({ type: "user" })}
        <span>{userData?.name} {userData?.lastName}</span>
      </div>
      <div>
        {Svg({ type: "email" })}
        <span>{userData?.email}</span>
      </div>
      <div>
        {Svg({ type: "phone" })}
        <span>{userData?.phone}</span>
      </div>
    </div>
  );
}

export default Render;