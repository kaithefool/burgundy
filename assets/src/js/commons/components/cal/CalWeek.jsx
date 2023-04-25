import React from 'react';
import useCal from './useCal';
import CalEventsAxis from './CalEventsAxis';
import CalDayHeader from './CalDayHeader';
import CalEventsGrid from './CalEventsGrid';

const CalWeek = () => {
  const { query, grid } = useCal();

  if (query.view !== 'week') return null;

  return (
    <CalEventsGrid
      header={grid.map((d) => (
        <div key={d.toString()} className="col">
          <CalDayHeader day={d} />
        </div>
      ))}
      events={grid.map((d, i) => (
        <div key={d.toString()} className={`col ${i ? 'border-start' : ''}`}>
          <CalEventsAxis day={d} style={{ height: '150vh' }} />
        </div>
      ))}
    />
  );
};

export default CalWeek;
