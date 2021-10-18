import React, { useState } from 'react';

import useList from './useList';

const ListPagination = ({
  className,
}) => {
  const [input, setInput] = useState('');
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
    <nav className={className} aria-label="List Pages">
      <ul className="pagination">
        <li className={`page-item${prev ? '' : ' disabled'}`}>
          <button
            type="button"
            onClick={() => to(pg.current - 1)}
            aria-label="Previous"
            className="page-link"
            tabIndex={prev ? '' : -1}
          >
            &lt;
          </button>
        </li>
        <li className="page-item">
          <span className="page-link">
            {`${pg.current} / ${pg.total}`}
          </span>
        </li>
        <li className={`page-item${next ? '' : ' disabled'}`}>
          <button
            type="button"
            onClick={() => to(pg.current + 1)}
            aria-label="Next"
            className="page-link"
            tabIndex={next ? '' : -1}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ListPagination;
