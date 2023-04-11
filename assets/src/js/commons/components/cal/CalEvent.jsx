import React from 'react';

const CalEvent = ({
  event,
  children,
}) => (
  <div className="rounded border px-1 overflow-hidden">
    {event.user?.email}
  </div>
);

export default CalEvent;
