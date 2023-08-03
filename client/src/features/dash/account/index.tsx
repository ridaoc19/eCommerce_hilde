// import React, { useContext } from 'react';
import Information from './information';
import Password from './password';
// import { CreateContext } from '../../../components/hooks/useContext';
// import { IContextData } from '../../../interfaces/context.interface';

function Account() {
  // const { dashboard: { dispatch } }: IContextData = useContext(CreateContext)!
  return (
    <div>
      <header className="user-form__header--content">
        <h2>Información de la cuenta</h2>
      </header>
      <Information />
      <Password />
    </div>
  );
}

export default Account;