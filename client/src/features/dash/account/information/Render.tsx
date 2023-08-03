import Svg from '../../../../assets/icons/Svg';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../../redux/reducers/user';

function Render() {
  const dataUser = useAppSelector(selectUserData)

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