import React, { useState, useEffect } from 'react';

import ListContext from './ListContext';
import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';

const ListProvider = ({
  children,
  api,
  initQuery = { skip: 0, limit: 30 },
  filter: baseFilter = {},
  selectable = false,
}) => {
  const { res, req, fetched } = useHttp();
  const [query, setQuery] = useState(initQuery);
  const [listFilter, setFilter] = useState({});
  const [selected, setSelected] = useState([]);

  const filter = { ...baseFilter, ...listFilter };

  const fetch = ({ filter: newF, ...q }) => {
    const newQ = { ...q, ...query };

    if (newF) {
      setFilter(newF);
      newQ.skip = 0; // reset pagination when filter changed
    }
    if (selectable) setSelected([]); // clear select
    if (Object.keys(q).length) setQuery(newQ);

    req({
      ...api,
      params: { ...newQ, filter: newF },
    });
  };

  const refresh = () => fetch({ skip: 0 });

  const select = (s) => setSelected(s);

  useEffect(() => {
    refresh();
  }, [useComparable({ baseFilter, api })]);

  return (
    <ListContext.Provider value={{
      query,
      filter,
      selected: selectable ? selected.map((i) => (
        fetched.payload.rows[i]
      )) : null,
      rows: fetched?.payload?.rows || [],
      res,

      fetch,
      refresh,
      select,
    }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
