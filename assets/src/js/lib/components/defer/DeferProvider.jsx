import React, { useState } from 'react';
import DeferContext from './DeferContext';

const DeferProvider = ({
  children,
  limit = 3,
}) => {
  const [alerts, setAlerts] = useState([]);

  const add = (http, config) => {

  };

  const value = {
    alerts,
  };

  return (
    <DeferContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </DeferContext.Provider>
  );
};

export default DeferProvider;
