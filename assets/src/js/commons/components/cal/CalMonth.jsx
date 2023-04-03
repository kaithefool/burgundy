import React from 'react';

import useCal from './useCal';
import CalEvent from './CalEvent';

const CalMonth = ({
  children,
}) => {
  const { isDay, events, grid } = useCal();

  return (
    <div>
      {grid.map((w, i) => (
        <div key={i} className="row g-0">
          {w.map((d) => (
            <div
              key={d.toString()}
              className="col ratio ratio-1x1"
            >
              <div>
                <h6>{d.day}</h6>
                <div className="p-3">
                  {events
                    .filter((e) => isDay(e, d))
                    .map((e) => (
                      <CalEvent key={e._id} event={e}>
                        {children}
                      </CalEvent>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalMonth;
