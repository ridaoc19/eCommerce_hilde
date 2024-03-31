// import React, { useContext } from 'react';
import Information from './information/Information';
import Password from './password/Password';

function Account() {

  return (
    <div className='account'>
      <header className={`account__header`}>
        <h2>Información de la cuenta</h2>
      </header>
      <div className={`account__information`}>
        <Information />
      </div>
      <div className={`account__password`}>
        <Password />
      </div>
    </div>
  );
}

export default Account;