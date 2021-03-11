import React from 'react';

import useHttp from '~/commons/hooks/useHttp';
import Pending from './Pending.jsx';
import Error from './Error.jsx';

const Fetchable = ({
  progress,
  req,
  res: resProp,
  children,
}) => {
  const { res } = useHttp(req);
  const r = req ? res : resProp;
  const { status } = r;

  if (status === 'pending') {
    return <Pending res={r} progress={progress} />;
  }
  if (status === 'error') {
    return <Error res={r} />;
  }

  return children(r);
};

export default Fetchable;
