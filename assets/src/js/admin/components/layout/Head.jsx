import React from 'react';

import NavAcc from '~/shared/components/NavAcc';
import accLinks from './accLinks';

const Head = () => (
  <div className="sticky-top bg-white px-3">
    <div className="row justify-content-between">
      <div className="col" />
      <div className="col-auto">
        <NavAcc links={accLinks} />
      </div>
    </div>
  </div>
);

export default Head;
