import React from 'react';

import useCal from './useCal';
import CalEvent from './CalEvent';
import Truncate from '../layout/Truncate';

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
              className="col"
            >
              <div>
                <h6>{d.day}</h6>
                <Truncate style={{ height: '10vh' }}>
                  {events
                    .filter((e) => isDay(e, d))
                    .map((e) => (
                      <CalEvent key={e._id} event={e}>
                        {children}
                      </CalEvent>
                    ))}
                </Truncate>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalMonth;
