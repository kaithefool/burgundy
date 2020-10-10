import React from 'react';

import Pending from './Pending.jsx';
import Error from './Error.jsx';

const Fetchable = ({
  progress,
  res,
  children,
}) => {
  const { status } = res;

  if (status === 'pending') {
    return <Pending res={res} progress={progress} />;
  }
  if (status === 'error') {
    return <Error res={res} />;
  }

  return children(res);
};

export default Fetchable;
