import React from 'react';

import useList from './useList';
import Pending from '../util/Pending.jsx';
import Error from '../util/Error.jsx';

const ListStatus = () => {
  const { res } = useList();

  return (
    <>
      {res.status === 'pending' && (
        <Pending />
      )}
      {res.status === 'error' && (
        <Error res={res} />
      )}
    </>
  );
};

export default ListStatus;
