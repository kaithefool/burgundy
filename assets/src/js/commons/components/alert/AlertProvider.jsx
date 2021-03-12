import React, { useState } from 'react';

import AlertContext from './AlertContext';
import useUniqKey from '../../hooks/useUniqKey';

const AlertProvider = ({
  children,
  limit = 3,
}) => {
  const [stack, setStack] = useState([]);
  const [, newKey] = useUniqKey();

  const push = (draft = [], ...alerts) => {
    const aa = alerts.map((a) => ({ ...a, key: newKey() }));

    setStack(draft.concat(aa).slice(-limit));
  };
  const remove = (key) => {
    setStack(stack.filter((s) => s.key !== key));
  };
  const purge = (a) => {
    push(stack.filter((s) => !s.dirty), a);
  };

  const value = {
    stack,

    push: (...a) => push([...stack], ...a),
    remove,
    purge,
  };

  return (
    <AlertContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
