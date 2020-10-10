import React, { useState, useEffect } from 'react';

import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';
import ListPagination from './ListPagination.jsx';
import Pending from '../util/Pending.jsx';

const ListHttp = ({
  api,
  skip = 0,
  limit = 20,
  sort,
  filter,
  refresh,
  children,
  onFetch = () => {},
}) => {
  const { res, req, fetched } = useHttp();
  const [query, setQuery] = useState({
    skip,
    limit,
    sort,
  });

  const fetch = (q) => {
    const nq = { ...query, ...q };
    const params = { ...nq };

    if (filter) params.filter = filter;

    setQuery(nq);
    req({
      ...api,
      params,
    });
    onFetch(nq);
  };

  useEffect(() => {
    fetch({ skip: 0 }); // reset pagination
  }, [
    refresh,
    useComparable({ filter, api }),
  ]);

  return (
    <div>
      <div className="form-row mb-3">
        <ListPagination
          {...{
            className: 'col-auto',
            ...query,
            total: fetched.total,
            onChange: fetch,
          }}
        />
        <div className="col"></div>
      </div>
      <div className="position-relative">
        {res.status === 'pending' && (
          <Pending />
        )}
        <div>
          {children({ fetched, fetch, query })}
        </div>
      </div>
    </div>
  );
};

export default ListHttp;
