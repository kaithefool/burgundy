import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import StepsContext from './StepsContext';

const StepsProvider = ({
  children,
  route = false,
}) => {
  const { step } = useParams();
  const value = {};

  return (
    <StepsContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </StepsContext.Provider>
  );
};

export default StepsProvider;
