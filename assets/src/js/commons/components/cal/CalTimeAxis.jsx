import React from 'react';
import { DateTime as dt } from 'luxon';
import CalDayHeader from './CalDayHeader';

const CalTimeAxis = ({
  header = false,
}) => {
  const d = dt.now().startOf('day');

  return (
    <div>
      {header && <CalDayHeader className="invisible" />}
      <div
        className="position-relative"
        style={{ height: '120vh' }}
      >
        {[...Array(25).keys()].map((h) => (
          <div
            key={h}
            hour={h}
            className={`position-${h ? 'absolute' : 'relative'}`}
            style={{ top: `${h * 4.166}%` }}
          >
            <div className="top-50 translate-middle-y small pe-3">
              <small className="font-monospace">
                {d.set({ hour: h }).toFormat('hha')}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalTimeAxis;
