import React from 'react';

import AlertItem from './AlertItem';
import useAlert from './useAlert';

const AlertStack = ({
  className = 'm-3',
  fullWidth = false,
}) => {
  const { stack } = useAlert();

  return (
    <div className={`
        toast-container
        ${fullWidth ? 'w-100' : ''}
        ${className}
      `}
    >
      {stack.map((a) => (
        <AlertItem
          className={fullWidth ? 'w-100' : ''}
          key={a.id}
          {...a}
        />
      ))}
    </div>
  );
};

export default AlertStack;
