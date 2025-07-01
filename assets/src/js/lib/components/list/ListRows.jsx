import React, { Fragment } from 'react';
import useList from './useList';

const ListRows = ({
  children,
}) => {
  const list = useList();

  return (
    <>
      {list.rows.map((row, i) => (
        <Fragment key={row?._id || row?.key || i}>
          {typeof children === 'function'
            ? children(row, i, list)
            : children}
        </Fragment>
      ))}
    </>
  );
};

export default ListRows;
