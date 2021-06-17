import React from 'react';

import Centered from '~/commons/components/layout/Centered';
import FormLogin from '../../forms/FormLogin';

const PageLogin = () => (
  <Centered>
    <div className="col-4 py-3">
      <FormLogin />
    </div>
  </Centered>
);

export default PageLogin;
