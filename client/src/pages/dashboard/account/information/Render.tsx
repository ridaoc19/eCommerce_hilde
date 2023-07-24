import React from 'react';
import { selectUserData } from '../../../../redux/reducers/user';
import { useAppSelector } from '../../../../redux/hooks';
import Svg from '../../../../components/assets/Svg';

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