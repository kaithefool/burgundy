import React from 'react';

import useList from './useList';
import Pending from '../util/Pending';
import Error from '../util/Error';

const ListStatus = ({
  children,
  empty = 'No record found',
  ...props
}) => {
  const { res, rows } = useList();

  return (
    <div {...props}>
      {res.status === 'pending' && (
        <Pending />
      )}
      {res.status === 'error' && (
        <Error res={res} />
      )}
      {rows.length ? children : empty}
    </div>
  );
};

export default ListStatus;
