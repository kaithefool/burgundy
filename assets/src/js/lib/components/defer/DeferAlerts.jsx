import React from 'react';

import DeferAlert from './DeferAlert';
import useDefer from './useDefer';

const DeferAlerts = ({
  className = 'm-3',
}) => {
  const { alerts } = useDefer();

  return (
    <div
      className={`toast-container ${className}`}
      style={{ zIndex: 10 }}
    >
      {alerts.map((a) => (
        <DeferAlert
          className="w-auto"
          key={a.id}
          {...a}
        />
      ))}
    </div>
  );
};

export default DeferAlerts;
