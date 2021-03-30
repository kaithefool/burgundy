import React from 'react';

import AlertItem from './AlertItem.jsx';
import useAlert from './useAlert';

const AlertStack = ({
  className = '',
}) => {
  const { stack } = useAlert();

  return (
    <div className="toast-container position-absolute">
      {stack.map((a) => (
        <AlertItem key={a.id} {...a} />
      ))}
    </div>
  );
};

export default AlertStack;
