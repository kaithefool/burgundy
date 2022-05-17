import React, { useState, useEffect } from 'react';

import ListContext from './ListContext';
import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';
import useQuery from '../../hooks/useQuery';
import useAlert from '../alert/useAlert';

const ListProvider = ({
  children,
  api,
  initQuery: iq,
  filter: baseFilter = {},
  selectable = false,
  cols = [],
  history = true,
}) => {
  const initQuery = { skip: 0, limit: 20, ...iq };
  const [urlQuery, setUrlQuery] = useQuery();
  const [activeCols, showCols] = useState(
    () => cols.filter((c) => !c.hide),
  );
  const { res, req, fetched } = useHttp();
  const [query, setQuery] = useState(() => ({
    ...initQuery,
    ...(history && {
      ...(urlQuery.skip && { skip: Number(urlQuery.skip) }),
      ...(urlQuery.limit && { limit: Number(urlQuery.limit) }),
    }),
  }));
  const [listFilter, setFilter] = useState(() => (
    (history && urlQuery?.filter) || {}
  ));
  const [selected, setSelected] = useState([]);

  const filter = { ...baseFilter, ...listFilter };

  const rows = fetched?.payload?.rows || [];

  const fetch = ({ filter: newF, ...q }) => {
    const newQ = { ...query, ...q };

    if (newF) {
      setFilter(newF);
      newQ.skip = 0; // reset pagination when filter changed
    }
    if (selectable) setSelected([]); // clear select
    if (Object.keys(q).length) setQuery(newQ);

    req({
      ...api,
      params: { ...newQ, filter: { ...baseFilter, ...newF } },
    });
  };

  const refresh = () => fetch({});

  const select = (s) => setSelected(s);

  // http alerts
  useAlert(res, {
    success: false,
  });

  useEffect(() => {
    showCols(cols.filter((c) => !c.hide));
  }, [useComparable(cols)]);

  useEffect(() => {
    refresh();
  }, [useComparable({ baseFilter, api })]);

  useEffect(() => {
    const { skip, limit } = query;

    setUrlQuery({
      ...(skip !== initQuery.skip && { skip }),
      ...(limit !== initQuery.limit && { limit }),
      filter: listFilter,
    }, true);
  }, [history && useComparable({ listFilter, query })]);

  const value = {
    api,
    query,
    filter,
    selectable,
    selected: selectable ? selected.map((i) => rows[i]) : [],
    selectedIndex: selected,
    cols,
    activeCols,
    fetched,
    rows,
    res,

    fetch,
    refresh,
    select,
    showCols,
  };

  return (
    <ListContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ListContext.Provider>
  );
};

export default ListProvider;
