import React from 'react';

import useCal from './useCal';
import CalDayOfWeek from './CalDayOfWeek';

const CalDayHeader = ({ day, ...props }) => {
  const { fetch, query } = useCal();
  const d = day || query.date;

  return (
    <div className="d-grid">
      <button
        type="button"
        className="btn p-2"
        onClick={() => fetch({ date: d, view: 'day' })}
        {...props}
      >
        <div className="text-center text-md-start">
          <small><CalDayOfWeek date={d} /></small>
          <h5 className="m-0">
            {d.day}
          </h5>
        </div>
      </button>
    </div>
  );
};

export default CalDayHeader;
