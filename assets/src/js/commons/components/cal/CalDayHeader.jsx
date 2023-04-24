import React from 'react';
import { DateTime as dt } from 'luxon';

import CalDayOfWeek from './CalDayOfWeek';

const CalDayHeader = ({ day, ...props }) => {
  const d = day || dt.now().startOf('day');

  return (
    <div {...props}>
      <small><CalDayOfWeek date={d} /></small>
      <h5>{d.day}</h5>
    </div>
  );
};

export default CalDayHeader;
