// import React, { useContext } from 'react';
import { useContext } from 'react';
import { CreateContext, IContextData } from '../../../hooks/useContext';
import Information from './information';
import Password from './password';
import AdminUser from './password/AdminUser/AdminUser';

function Account() {
  const { dashboard: { stateDashboard: { permits: { admin } } } }: IContextData = useContext(CreateContext)!

  return (
    <div>
      <header className="user-form__header--content">
        <h2>Información de la cuenta</h2>
      </header>
      <div>
        <Information />
      </div>
      <div>
        <Password />
      </div>
      <div>
        {admin && <AdminUser />}
      </div>
    </div>
  );
}

export default Account;