import React from 'react';

import useList from './useList';

const ListPagination = ({
  className,
}) => {
  const {
    query: { skip, limit },
    fetched,
    fetch,
  } = useList();
  const total = fetched?.payload?.total || 0;
  const pg = {
    total: Math.ceil(total / limit) || 0,
    current: skip / limit + 1,
  };

  // buttons
  const prev = pg.current > 1;
  const next = pg.current < pg.total;

  const to = (page) => {
    if (page > 0 && page <= pg.total) {
      fetch({ skip: limit * (page - 1) });
    }
  };

  if (pg.total < 1) return '';

  return (
    <div className={`pagination ${className}`}>
      <div
        className={`page-item${prev ? '' : ' disabled'}`}
        onClick={() => to(pg.current - 1)}
      >
        <a href="#" className="page-link">&lt;</a>
      </div>
      <div className="page-item disabled">
        <a className="page-link">
          {pg.current} / {pg.total}
        </a>
      </div>
      <div
        className={`page-item${next ? '' : ' disabled'}`}
        onClick={() => to(pg.current + 1)}
      >
        <a href="#" className="page-link">&gt;</a>
      </div>
    </div>
  );
};

export default ListPagination;
