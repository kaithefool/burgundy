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
  <div className="row gy-3 my-3 align-items-center">
    {title && (
      <div className="col-12 col-sm">
        <h5 className="m-0"><CalTitle /></h5>
      </div>
    )}
    {today && (
      <div className="col col-sm-auto">
        <CalToday />
      </div>
    )}
    {arrows && (
      <div className="col-auto px-0">
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
