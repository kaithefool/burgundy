import React from 'react';

import useList from '../useList';
import ListStatus from '../ListStatus';
import { useVisible } from '../../../hooks/useObserver';

const ListPgMore = () => {
  const { fetch, pile: { rows, end }, res } = useList();

  const { ref } = useVisible((isVisible) => {
    if (
      rows.length
      && res.status === 'success'
      && isVisible
    ) {
      fetch({ from: rows.slice(-1)[0]?._id });
    }
  });

  if (end) return '';

  return (
    <div
      ref={ref}
      className="vh-25 position-relative"
    >
      <ListStatus empty="" />
    </div>
  );
};

export default ListPgMore;
