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

  const rows = fetched?.payload?.rows || [];

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

  const value = {
    api,
    query,
    filter,
    selectable,
    selected: selectable ? selected.map((i) => rows[i]) : [],
    selectedIndex: selected,
    rows,
    res,

    fetch,
    refresh,
    select,
  };

  return (
    <ListContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ListContext.Provider>
  );
};

export default ListProvider;
