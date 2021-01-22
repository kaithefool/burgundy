import React, { useContext } from 'react';

import AlertCtx from './AlertCtx';
import Alert from './Alert.jsx';

const AlertStack = ({
  className,
}) => {
  const { stack } = useContext(AlertCtx);

  return (
    <div className={className}>
      {stack.map((a, i) => (
        <Alert key={i} {...a}></Alert>
      ))}
    </div>
  );
};

export default AlertStack;
