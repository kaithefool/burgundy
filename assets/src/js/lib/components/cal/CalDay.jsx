import React from 'react';

import CalEventsAxis from './CalEventsAxis';
import CalDayHeader from './CalDayHeader';
import CalEventsGrid from './CalEventsGrid';
import useCal from './useCal';

const CalDay = ({ children }) => {
  const { query } = useCal();

  if (query.view !== 'day') return null;

  return (
    <CalEventsGrid
      header={(
        <div className="col">
          <CalDayHeader />
        </div>
        )}
      events={(
        <div className="col">
          <CalEventsAxis style={{ height: '150vh' }}>
            {children}
          </CalEventsAxis>
        </div>
        )}
    />
  );
};

export default CalDay;
