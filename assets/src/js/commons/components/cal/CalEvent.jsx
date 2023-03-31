import React from 'react';

const CalEvent = ({
  event,
  children,
}) => (
  <div className="card border-start-3 border-primary">
    <div className="card-body">
      {event.user?.email}
    </div>
  </div>
);

export default CalEvent;
