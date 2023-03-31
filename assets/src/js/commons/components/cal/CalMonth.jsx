import React, { useMemo } from 'react';
import { DateTime as dt } from 'luxon';
import { Calendar } from 'calendar';

import useCal from './useCal';
import CalEvent from './CalEvent';

const CalMonth = ({
  children,
}) => {
  const { query: { date }, isDay, events } = useCal();
  const weeks = useMemo(() => {
    const cal = new Calendar();

    return cal.monthDates(date.year, date.month - 1)
      .map((w) => w.map((d) => dt.fromJSDate(d)));
  }, [date.year, date.month]);

  return (
    <div>
      {weeks.map((w, i) => (
        <div key={i} className="row">
          {w.map((d) => (
            <div
              key={d.toString()}
              className="col border-top border-start"
            >
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalMonth;
