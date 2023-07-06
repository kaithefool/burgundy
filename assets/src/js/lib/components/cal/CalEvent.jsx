import React from 'react';

import CalEventTime from './CalEventTime';

const className = `
  shadow-sm bg-body overflow-hidden
  border-primary border-start border-4 ps-2
`;

const CalEvent = ({
  event,
  children,
  ...props
}) => {
  if (children) {
    return typeof children === 'function'
      ? children(event, props)
      : children;
  }

  return (
    <div
      className={className}
      {...props}
    >
      <small className="fw-bold">
        <CalEventTime event={event} />
      </small>
    </div>
  );
};

export default CalEvent;
