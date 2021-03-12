import React from 'react';

import AlertItem from './AlertItem.jsx';
import useAlert from './useAlert';

const AlertStack = () => {
  const { stack } = useAlert();

  return (
    <div className="toast-container position-absolute">
      {stack.map((a) => (
        <AlertItem key={a.key} {...a} />
      ))}
    </div>
  );
};

export default AlertStack;
