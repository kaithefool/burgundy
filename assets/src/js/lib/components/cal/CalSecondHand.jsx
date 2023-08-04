import React, { useState } from 'react';
import { DateTime as dt } from 'luxon';

import useInterval from '../../hooks/useInterval';

const getTop = (day) => {
  const now = dt.now();

  if (day && !now.hasSame(day, 'day')) return null;

  const sec = now.diff(now.startOf('day')).as('seconds');

  return Math.round((sec / 86400) * 10000) / 100;
};

const CalSecondHand = ({
  day,
  theme = 'danger',
  dot = '.8rem',
}) => {
  const [top, setTop] = useState(getTop(day));

  useInterval(() => {
    const t = getTop(day);

    if (t !== top) setTop(t);
  }, 60000);

  if (top === null) return '';

  return (
    <div
      className={`position-absolute w-100 bg-${theme}`}
      style={{
        pointerEvents: 'none',
        top: `${top}%`,
        height: '2px',
      }}
    >
      {dot && (
        <div
          className={`
            position-absolute top-50 start-0 translate-middle
            bg-${theme} rounded-circle
          `}
          style={{ width: dot, height: dot }}
        />
      )}
    </div>
  );
};

export default CalSecondHand;
