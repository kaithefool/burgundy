import React, { Fragment } from 'react';

import useCal from './useCal';
import CalEvent from './CalEvent';
import CalSecondHand from './CalSecondHand';

const round = (n) => Math.round(n * 100) / 100;

const CalEventsAxis = ({
  day,
  className = '',
  secondHand,
  children,
  ...props
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
    <div
      className={`position-relative ${className}`}
      {...props}
    >
      {/* background lines */}
      <div className="w-100 h-100">
        {[...Array(24).keys()].map((h) => (
          <div
            key={h}
            className={h ? 'border-top' : ''}
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
              <CalEvent
                key={e._id}
                style={{
                  position: 'absolute',
                  left: `${ii * w}%`,
                  width: `${w}%`,
                  ...pctInDay(e, d),
                }}
                event={e}
              >
                {children}
              </CalEvent>
            ))}
          </Fragment>
        );
      })}

      {/* second hand */}
      {secondHand !== null && (
        <CalSecondHand day={d} {...secondHand} />
      )}
    </div>
  );
};

export default CalEventsAxis;
