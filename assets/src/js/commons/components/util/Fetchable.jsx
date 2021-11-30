import React from 'react';

import useHttp from '~/commons/hooks/useHttp';
import Pending from './Pending';
import Error from './Error';

const Fetchable = ({
  progress,
  req,
  res: resProp,
  children,
}) => {
  const { res } = useHttp(req);
  const r = req ? res : resProp;
  const { status } = r;

  if (status === 'error') {
    return <Error res={r} />;
  }
  if (status === 'success') {
    return typeof children === 'function'
      ? children(r.payload) : children;
  }

  return <Pending res={r} progress={progress} />;
};

export default Fetchable;
