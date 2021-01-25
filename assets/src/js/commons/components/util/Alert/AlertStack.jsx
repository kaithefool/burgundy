import React from 'react';

import AlertMsg from './AlertMsg.jsx';
import useAlertStack from './useAlertStack';

const AlertStack = ({
  res,
  onSuccess,
  onError,
  className,
}) => {
  const { stack } = useAlertStack(res, { onSuccess, onError });

  return (
    <div className={className}>
      {stack.map((a) => (
        <AlertMsg key={a.key} {...a}></AlertMsg>
      ))}
    </div>
  );
};

export default AlertStack;
