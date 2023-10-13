import React from 'react';

import NavAcc from '~/shared/components/NavAcc';
import accLinks from './accLinks';
import NavMainSm from './NavMainSm';

const Head = () => (
  <div className="bg-white px-3">
    <div className="row align-items-center">
      <div className="col">
        <NavMainSm />
      </div>
      <div className="col-auto">
        <NavAcc links={accLinks} />
      </div>
    </div>
  </div>
);

export default Head;
