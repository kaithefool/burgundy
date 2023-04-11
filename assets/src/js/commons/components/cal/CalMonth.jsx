import React from 'react';

import useCal from './useCal';
import CalEvent from './CalEvent';
import Truncated from '../layout/Truncated';

const CalMonth = ({
  children,
}) => {
  const {
    query, isDay, events, grid,
  } = useCal();

  if (query.view !== 'month') return null;

  return (
    <div>
      {grid.map((w, i) => (
        <div key={i} className="row g-0">
          {w.map((d) => (
            <div
              key={d.toString()}
              className="col"
            >
              <div>
                <h6>{d.day}</h6>
                <Truncated style={{ height: '10vh' }}>
                  {events
                    .filter((e) => isDay(e, d))
                    .map((e) => (
                      <CalEvent key={e._id} event={e}>
                        {children}
                      </CalEvent>
                    ))}
                </Truncated>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalMonth;
