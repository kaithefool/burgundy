import React, { useState } from 'react';

import AlertCtx from './AlertCtx';

let k = 0;

const AlertStacker = ({
  children,
  max = 3,
}) => {
  const [stack, setStack] = useState([]);

  const pushAlert = (a) => {
    k += 1;
    setStack([...stack, { ...a, key: k += 1 }].slice(-max));
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

export default AlertStacker;
