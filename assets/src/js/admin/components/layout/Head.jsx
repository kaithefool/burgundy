import React from 'react';

import NavAcc from '~/shared/components/NavAcc';
import Logo from '~/shared/components/Logo';
import BtnLng from '~/lib/components/btns/BtnLng';
import accLinks from './accLinks';
import NavMainSm from './NavMainSm';

const Head = () => (
  <div className="bg-white px-4">
    <div className="row g-0 align-items-center">
      <div className="col-auto d-md-none">
        <NavMainSm />
      </div>
      <div className="col-auto d-md-none">
        <Logo />
      </div>
      <div className="col" />
      <div className="col-auto">
        <BtnLng showLabel />
      </div>
      <div className="col-auto">
        <NavAcc links={accLinks} />
      </div>
    </div>
  </div>
);

export default Head;
