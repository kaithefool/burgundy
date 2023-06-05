import React from 'react';

import CalTimeAxis from './CalTimeAxis';

const CalEventsGrid = ({
  header,
  events,
}) => (
  <div className="grid-border rounded">
    <div className="row g-0">
      <div className="col-auto invisible">
        <CalTimeAxis range={[0, 1]} />
      </div>
      {header}
    </div>
    <div className="row g-0">
      <div className="col-auto">
        <CalTimeAxis />
      </div>
      {events}
    </div>
  </div>
);

export default CalEventsGrid;
