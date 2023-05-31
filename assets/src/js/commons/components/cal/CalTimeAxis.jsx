import React from 'react';
import { DateTime as dt } from 'luxon';

const CalTimeAxis = ({
  range = [1, 24],
}) => {
  const d = dt.now().startOf('day');

  return (
    <div
      className="position-relative h-100"
    >
      {[...Array(25).keys()].slice(...range).map((h) => (
        <div
          key={h}
          className={`position-${h !== range[0] ? 'absolute' : 'relative'}`}
          style={{ top: `${h * 4.166}%` }}
        >
          <div className="top-50 translate-middle-y small px-2">
            <small className="font-monospace">
              {d.set({ hour: h }).toFormat('hha')}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalTimeAxis;
