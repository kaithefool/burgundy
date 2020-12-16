import React from 'react';

import Centered from '~/commons/components/layout/Centered.jsx';
import FormLogin from '../forms/FormLogin.jsx';

const PageLogin = () => (
  <Centered>
    <div className="col-4 py-3">
      <FormLogin />
    </div>
  </Centered>
);

export default PageLogin;
