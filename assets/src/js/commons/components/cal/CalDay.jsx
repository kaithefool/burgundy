import React, { Fragment } from 'react';

import useCal from './useCal';
import CalEvent from './CalEvent';
import CalDayHeader from './CalDayHeader';

const round = (n) => Math.round(n * 100) / 100;

const CalDay = ({
  day,
}) => {
  const {
    query, isDay, events, isOverlap, pctInDay,
  } = useCal();
  const d = day || query.date;

  const evtsGrid = [];

  events.forEach((e) => {
    if (!isDay(e, d)) return;

    const row = evtsGrid.find((r) => r.some((e2) => isOverlap(e, e2)));

    if (row) row.push(e);
    else evtsGrid.push([e]);
  });

  return (
    <div>
      <CalDayHeader day={day} />
      <div
        className="col position-relative"
        style={{ height: '120vh' }}
      >
        {/* background lines */}
        <div className="position-absolute w-100 h-100">
          {[...Array(24).keys()].map((h) => (
            <div
              key={h}
              className="border-bottom border-end"
              style={{ height: '4.166%' }}
            />
          ))}
        </div>
        {/* events */}
        {evtsGrid.map((r, i) => {
          const w = round(100 / r.length);

          return (
            <Fragment key={i}>
              {r.map((e, ii) => (
                <div
                  key={e._id}
                  className="position-absolute"
                  style={{
                    left: `${ii * w}%`,
                    width: `${w}%`,
                    ...pctInDay(e, d),
                  }}
                >
                  <CalEvent event={e} />
                </div>
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CalDay;
