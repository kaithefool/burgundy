import React, { useState, useEffect } from 'react';

import useList from './useList';

const ListPagination = ({
  className = 'col-auto',
  size,
  limits = [20, 40, 60],
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

  // keep input value updated
  useEffect(() => {
    setInput(pg.current);
  }, [pg.current]);

  // buttons and inputs
  const prev = pg.current > 1;
  const next = pg.current < pg.total;
  const chW = pg.current.toString().length;

  const to = (page) => {
    if (page > 0 && page <= pg.total) {
      fetch({ skip: limit * (page - 1) });
    }
  };

  return (
    <nav className={className} aria-label="List Pages">
      <div className="row">

        {/* limit */}
        <div className="col">
          <select
            className="form-select"
            value={limit}
            onChange={(e) => {
              const { value } = e.target;

              fetch({ limit: value });
            }}
          >
            {limits.map((l) => (
              <option value={l} key={l}>
                {`${l} per page`}
              </option>
            ))}
          </select>
        </div>

        {/* skip */}
        {pg.total > 1 && (
          <div className="col">
            <ul className="pagination">
              {/* previous button */}
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
              {/* current and total pages */}
              <li className="page-item">
                <span className="page-link p-0">
                  <div
                    className={`
                      input-group
                      ${size ? `input-group-${size}` : ''}
                    `}
                  >
                    <input
                      className={`
                        form-control bg-transparent
                        border-0
                      `}
                      value={input}
                      onChange={(e) => {
                        const { value } = e.target;

                        setInput(value);
                        to(value);
                      }}
                      onBlur={() => {
                        setInput(pg.current);
                      }}
                      style={{
                        width: `calc(${chW}ch + ${
                          { sm: 1, md: 1.5, lg: 2 }[size || 'md']
                        }rem)`,
                      }}
                    />
                    <div className="input-group-append">
                      <span
                        className={`
                          input-group-text
                          bg-transparent ps-0 border-0
                        `}
                      >
                        {`/ ${pg.total}`}
                      </span>
                    </div>
                  </div>
                </span>
              </li>
              {/* next button */}
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
          </div>
        )}

      </div>
    </nav>
  );
};

export default ListPagination;
