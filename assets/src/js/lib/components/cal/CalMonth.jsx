import React from 'react';

import useCal from './useCal';
import CalEvent from './CalEvent';
import Truncated from '../layout/Truncated';
import CalDayOfWeek from './CalDayOfWeek';

const CalMonth = ({
  children,
}) => {
  const {
    query, isDay, events, grid, fetch,
  } = useCal();

  if (query.view !== 'month') return null;

  return (
    <div className="grid-border rounded-3">
      <div className="row g-0">
        {grid[0].map((d) => (
          <div className="col p-2" key={d.weekday}>
            <h6 className="m-0 small text-center text-md-start">
              <CalDayOfWeek date={d} />
            </h6>
          </div>
        ))}
      </div>

      {grid.map((w, i) => (
        <div key={i} className="row g-0">
          {w.map((d) => (
            <div
              key={d.toString()}
              className="col p-2"
            >
              <div>
                <div className="text-center text-md-start">
                  <button
                    type="button"
                    className={`
                      btn btn-sm m-0 ms-md-n2 mt-md-n2
                      ${d.month !== query.date.month ? 'text-muted' : ''}
                    `}
                    onClick={() => fetch({ date: d, view: 'day' })}
                  >
                    {d.day}
                  </button>
                </div>
                <Truncated
                  style={{ height: '12vh' }}
                  onMore={() => fetch({ date: d, view: 'day' })}
                >
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
