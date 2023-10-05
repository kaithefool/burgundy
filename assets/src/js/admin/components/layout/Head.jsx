import React from 'react';

import NavAcc from '~/shared/components/NavAcc';

const Head = () => (
  <div className="sticky-top bg-white px-3">
    <div className="row justify-content-between">
      <div className="col" />
      <div className="col-auto">
        <NavAcc />
      </div>
    </div>
  </div>
);

export default Head;
