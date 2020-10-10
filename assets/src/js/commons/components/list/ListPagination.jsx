import React from 'react';

const ListPagination = (props) => {
  const {
    skip,
    limit,
    total,
    onChange = () => {},
    className,
  } = props;
  const pg = {
    total: Math.ceil(total / limit) || 0,
    current: skip / limit + 1,
  };

  // buttons
  const prev = pg.current > 1;
  const next = pg.current < pg.total;

  const to = (page) => {
    if (page > 0 && page <= pg.total) {
      onChange({ skip: limit * (page - 1) });
    }
  };

  return (
    <div className={`pagination ${className}`}>
      {pg.total > 1 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default ListPagination;
