import React from 'react';
import { DateTime as dt } from 'luxon';

import CalDayOfWeek from './CalDayOfWeek';

const CalDayHeader = ({ day, ...props }) => {
  const d = day || dt.now().startOf('day');

  return (
    <div {...props}>
      <div className="p-2 text-center text-md-start">
        <small><CalDayOfWeek date={d} /></small>
        <h5 className="m-0">{d.day}</h5>
      </div>
    </div>
  );
};

export default CalDayHeader;
