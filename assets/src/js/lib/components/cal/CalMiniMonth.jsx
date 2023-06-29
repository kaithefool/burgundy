import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';

import useCal from './useCal';
import CalDayOfWeek from './CalDayOfWeek';

const CalMiniMonth = ({
  onClick,
}) => {
  const {
    query, isDay, events, grid, parent,
  } = useCal();

  if (query.view !== 'month') return null;

  return (
    <div className="small">
      <div className="row g-0 fw-bold pb-2">
        {grid[0].map((d) => (
          <div
            className="col text-center"
            key={d.weekday}
          >
            <CalDayOfWeek date={d} />
          </div>
        ))}
      </div>

      {grid.map((w, i) => (
        <div key={i} className="row g-0">
          {w.map((d) => {
            const hasEvents = events.some((e) => isDay(e, d));

            return (
              <div
                key={d.toString()}
                className="col text-center"
              >
                <button
                  type="button"
                  className={`
                    btn btn-sm
                    ${d.month !== query.date.month ? 'text-muted' : ''}
                  `}
                  onClick={() => {
                    if (onClick) {
                      onClick({ date: d });
                    } else if (parent) {
                      parent.fetch({ date: d, view: 'day' });
                    }
                  }}
                >
                  {d.day}
                  <div
                    className={!hasEvents ? 'opacity-0' : ''}
                    style={{ fontSize: '.36rem' }}
                  >
                    <FA icon={faCircle} className="text-primary" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalMiniMonth;
