import React from 'react';

import AlertItem from './AlertItem.jsx';
import useAlert from './useAlert';

const AlertStack = ({
  className = '',
  fullWidth = false,
}) => {
  const { stack } = useAlert();

  return (
    <div className={`
      toast-container ${className}
      ${fullWidth ? 'w-100' : ''}
    `}>
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
