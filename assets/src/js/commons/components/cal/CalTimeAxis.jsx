import React from 'react';
import { DateTime as dt } from 'luxon';

import useCal from './useCal';

const CalTimeAxis = () => {
  // const { isDay, events, grid } = useCal();
  const d = dt.now().startOf('day');

  return (
    <div className="position-relative vh-100">
      {[...Array(25).keys()].map((h) => (
        <div
          key={h}
          className="position-absolute small end-0 h-0"
          style={{
            top: `${h * 4.166}%`,
            height: 0,
          }}
        >
          <div className="top-50 translate-middle-y">
            {d.set({ hour: h }).toLocaleString(dt.TIME_SIMPLE)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalTimeAxis;
