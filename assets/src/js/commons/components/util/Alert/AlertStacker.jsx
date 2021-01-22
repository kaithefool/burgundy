import React, { useState } from 'react';

import AlertCtx from './AlertCtx';

const AlertStacker = ({
  children,
  max = 3,
}) => {
  const [stack, setStack] = useState([]);

  const pushAlert = (a) => {
    setStack([...stack.slice(-max), a]);
  };

  return (
    <AlertCtx.Provider value={{
      stack,
      pushAlert,
    }}>
      {children}
    </AlertCtx.Provider>
  );
};
