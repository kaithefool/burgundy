import React from 'react';

import CalTitle from './CalTitle';
import CalToday from './CalToday';
import CalArrows from './CalArrows';
import CalViewSwitch from './CalViewSwitch';

const CalHeader = () => (
  <div className="row align-items-center my-3">
    <div className="col">
      <h5 className="m-0"><CalTitle /></h5>
    </div>
    <div className="col-auto">
      <CalToday />
    </div>
    <div className="col-auto">
      <CalArrows />
    </div>
    <div className="col-auto">
      <CalViewSwitch />
    </div>
  </div>
);

export default CalHeader;
