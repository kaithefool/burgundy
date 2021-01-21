import React, { useState } from 'react';

import AlertCtx from './AlertCtx';

const AlertStacker = ({
  children,
}) => {
  const [stack, setStack] = useState([]);

  return (
    <AlertCtx.Provider value={{
      stack,
    }}>
      {children}
    </AlertCtx.Provider>
  );
};
