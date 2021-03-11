import React, { useState } from 'react';

import AlertContext from './AlertContext';

const AlertProvider = ({
  children,
  limit = 3,
}) => {
  const [stack, setStack] = useState([]);

  const push = (a) => {
    setStack([stack].concat([a]).slice(-limit));
  };

  const value = {
    stack,

    push,
  };

  return (
    <AlertContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </AlertContext.Provider>
  );
};
