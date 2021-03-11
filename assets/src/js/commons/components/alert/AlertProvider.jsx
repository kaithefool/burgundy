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
  const remove = (index) => {
    setStack([...stack].splice(index, 1));
  };

  const value = {
    stack,

    push,
    remove,
  };

  return (
    <AlertContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
