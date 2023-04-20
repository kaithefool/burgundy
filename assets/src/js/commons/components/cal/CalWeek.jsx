import React from 'react';
import useCal from './useCal';
import CalDay from './CalDay';
import CalTimeAxis from './CalTimeAxis';

const CalWeek = () => {
  const { query, grid } = useCal();

  if (query.view !== 'week') return null;

  return (
    <div>
      {/* header */}
      <div className="row">
        <div className="col-auto" style={{ width: '60px' }} />
        {grid.map((d) => (
          <div key={d.toString()} className="col">
            <h4>{d.day}</h4>
          </div>
        ))}
      </div>
      <div className="row g-0">
        <div className="col-auto" style={{ width: '60px' }}>
          <CalTimeAxis />
        </div>
        {grid.map((d) => (
          <div key={d.toString()} className="col">
            <CalDay day={d} className="vh-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalWeek;
