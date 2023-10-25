import React from 'react';

import Centered from '~/lib/components/layout/Centered';
import Logo from '~/shared/components/Logo';
import FormLogin from '../../forms/FormLogin';

const PageLogin = () => (
  <Centered>
    <div className="text-center py-3">
      <Logo className="fs-3" />
    </div>
    <FormLogin />
  </Centered>
);

export default PageLogin;
