import React from 'react';

import AlertItem from './AlertItem';
import useAlert from './useAlert';

const AlertStack = ({
  className = 'm-3',
}) => {
  const { stack } = useAlert();

  return (
    <div
      className={`
        toast-container ${className}
      `}
      style={{ zIndex: 10 }}
    >
      {stack.map((a) => (
        <AlertItem
          className="w-auto"
          key={a.id}
          {...a}
        />
      ))}
    </div>
  );
};

export default AlertStack;
