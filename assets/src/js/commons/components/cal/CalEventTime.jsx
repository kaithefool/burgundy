// eslint-disable-next-line no-unused-vars
import React from 'react';

import useCal from './useCal';

const CalEventTime = ({ event, format = 'H:mm a' }) => {
  const { eventDates } = useCal();
  const d = eventDates(event);

  return Array.isArray(d)
    ? `${d[0].toFormat(format)} - ${d[1].toFormat(format)}`
    : d.toFormat(format);
};

export default CalEventTime;
