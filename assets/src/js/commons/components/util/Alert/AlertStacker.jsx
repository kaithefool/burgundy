import React, { useState } from 'react';

import AlertCtx from './AlertCtx';
import useUniqKey from '../../../hooks/useUniqKey';

const AlertStacker = ({
  children,
  max = 3,
}) => {
  const [stack, setStack] = useState([]);
  const [, newKey] = useUniqKey();

  const pushAlert = (a) => {
    setStack([...stack, { ...a, key: newKey() }].slice(-max));
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
