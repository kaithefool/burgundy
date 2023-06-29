import React from 'react';

import CalTitle from './CalTitle';
import CalToday from './CalToday';
import CalArrows from './CalArrows';
import CalViewSwitch from './CalViewSwitch';

const CalHeader = ({
  title = true,
  today = true,
  arrows = true,
  viewSwitch = true,
}) => (
  <div className="row align-items-center my-3">
    {title && (
      <div className="col">
        <h5 className="m-0"><CalTitle /></h5>
      </div>
    )}
    {today && (
      <div className="col-auto">
        <CalToday />
      </div>
    )}
    {arrows && (
      <div className="col-auto">
        <CalArrows />
      </div>
    )}
    {viewSwitch && (
      <div className="col-auto">
        <CalViewSwitch />
      </div>
    )}
  </div>
);

export default CalHeader;
