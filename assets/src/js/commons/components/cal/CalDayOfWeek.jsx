import React from 'react';

const CalDayOfWeek = ({ date }) => (
  <>
    <span className="d-none d-md-inline">
      {date.toFormat('ccc')}
    </span>
    <span className="d-md-none">
      {date.toFormat('ccccc')}
    </span>
  </>
);

export default CalDayOfWeek;
