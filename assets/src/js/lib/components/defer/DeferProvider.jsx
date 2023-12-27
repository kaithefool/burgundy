import React from 'react';

import DeferContext from './DeferContext';

const DeferProvider = ({
  children,
  limit = 3,
}) => {
  const value = {
    logs: [],
  };

  return (
    <DeferContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </DeferContext.Provider>
  );
};

export default DeferProvider;
