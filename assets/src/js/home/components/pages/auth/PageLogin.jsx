import React from 'react';

import Centered from '~/commons/components/layout/Centered';
import BtnLng from '~/commons/components/btns/BtnLng';
import FormLogin from '../../forms/FormLogin';

const PageLogin = () => (
  <Centered>
    <div className="text-end">
      <div className="d-inline-block">
        <BtnLng />
      </div>
    </div>
    <FormLogin />
  </Centered>
);

export default PageLogin;
