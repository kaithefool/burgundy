import React from 'react';
import { DateTime as dt } from 'luxon';

const CalTimeAxis = () => {
  const d = dt.now().startOf('day');

  return (
    <div className="position-relative font-monospace h-100">
      {[...Array(25).keys()].map((h) => (
        <div
          key={h}
          className="position-absolute small pe-3 h-0"
          style={{
            top: `${h * 4.166}%`,
            height: 0,
          }}
        >
          <div className="top-50 translate-middle-y">
            {d.set({ hour: h }).toFormat('hh a')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalTimeAxis;
