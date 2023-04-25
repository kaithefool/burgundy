import React from 'react';

import useCal from './useCal';

const CalEvent = ({
  event,
  children,
}) => {
  const { eventDates } = useCal();
  const d = eventDates(event);

  return (
    <div className="rounded border bg-body overflow-hidden">
      <div className="border-primary border-start border-4 ps-2">
        <h6 className="m-0 small">
          <strong>{d.toFormat('H:mm')}</strong>
          {' '}
          {event.user?.email || event.action}
        </h6>
      </div>
    </div>
  );
};

export default CalEvent;
