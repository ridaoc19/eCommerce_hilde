// import React, { useContext } from 'react';
import { useContext } from 'react';
import { CreateContext } from '../../../hooks/useContext';
import { IContext } from '../../../interfaces/hooks/context.interface';
import Information from './information';
import Password from './password';
import AdminUser from './password/AdminUser/AdminUser';

function Account() {
  const { dashboard: { state: { permits: { admin } } } }: IContext.IContextData = useContext(CreateContext)!

  return (
    <div>
      <header className="user-form__header--content">
        <h2>Información de la cuenta</h2>
      </header>
      <Information />
      <Password />
      {admin && <AdminUser />}
    </div>
  );
}

export default Account;