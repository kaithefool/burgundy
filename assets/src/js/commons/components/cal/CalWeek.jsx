import React from 'react';
import useCal from './useCal';
import CalDay from './CalDay';
import CalTimeAxis from './CalTimeAxis';

const CalWeek = () => {
  const { query, grid } = useCal();

  if (query.view !== 'week') return null;

  return (
    <div>
      <div className="row g-0">
        <div className="col">
          <CalTimeAxis />
        </div>
        {grid.map((d) => (
          <div key={d.toString()} className="col">
            <h6>{d.day}</h6>
            <CalDay day={d} className="vh-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalWeek;
