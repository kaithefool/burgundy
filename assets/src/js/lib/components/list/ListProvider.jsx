import React, { useState, useEffect } from 'react';

import ListContext from './ListContext';
import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';
import useDidUpdate from '../../hooks/useDidUpdate';
import useQuery from '../../hooks/useQuery';
import useAlert from '../alert/useAlert';
import useList from './useList';

const ListProvider = ({
  children,
  api,
  initQuery: iq,
  filter: baseFilter = {},
  selectable = false,
  cols = [],
  history = true,
  lazy = false,
  infinite = false,
  rows: nonHttpRows,
}) => {
  const initQuery = {
    ...!infinite && { skip: 0, limit: 20 },
    filter: {},
    ...iq,
  };
  const [urlQuery, setUrlQuery] = useQuery();
  const [activeCols, showCols] = useState(
    () => cols.filter((c) => !c.hide),
  );
  const { res, req, fetched } = useHttp();
  const [pile, setPile] = useState({ rows: [] });
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState(() => ({
    ...initQuery,
    ...(history && {
      ...(urlQuery.skip && { skip: Number(urlQuery.skip) }),
      ...(urlQuery.limit && { limit: Number(urlQuery.limit) }),
      ...(urlQuery.filter && { filter: urlQuery.filter }),
    }),
  }));
  const [refreshCount, setRefreshCount] = useState(0);

  const lazying = lazy && !Object.keys(query.filter).length;
  let rows = [];

  if (nonHttpRows) {
    rows = typeof nonHttpRows === 'function'
      ? nonHttpRows(query) : nonHttpRows;
  } else if (!lazying) {
    rows = infinite
      ? pile.rows
      : fetched?.payload?.rows || [];
  }
  const fetch = (q = {}) => {
    const newQ = { ...query, ...q };

    if (q.filter) {
      // reset pagination when filter changed
      if (infinite) {
        delete newQ.from;
        setPile({ rows: [] });
      } else {
        newQ.skip = 0;
      }
    }
    if (selectable) setSelected([]); // clear select

    setQuery(newQ); // set state

    if (
      !nonHttpRows
      && (!lazy || Object.keys(newQ.filter).length)
    ) {
      req({
        ...api,
        params: { ...newQ, filter: { ...newQ.filter, ...baseFilter } },
      });
    }
  };

  const refresh = () => {
    if (infinite) setPile({ rows: [] });
    fetch();
    setRefreshCount(refreshCount + 1);
  };

  useList({ onRefresh: refresh });

  const select = (s) => setSelected(s);

  // http alerts
  useAlert(res, {
    success: false,
  });

  // toggle cols
  useEffect(() => {
    showCols(cols.filter((c) => !c.hide));
  }, [useComparable(cols)]);

  useEffect(() => {
    if (!lazying) fetch();
  }, []);

  // refresh when filter changed
  useDidUpdate(() => {
    fetch(initQuery);
  }, [useComparable({ baseFilter, api })]);

  // update url query
  useEffect(() => {
    if (history) {
      const { skip, limit } = query;

      setUrlQuery({
        ...(skip !== initQuery.skip && { skip }),
        ...(limit !== initQuery.limit && { limit }),
        filter: query.filter,
      }, true);
    }
  }, [history && useComparable({ query })]);

  // pile up payloads in infinite mode
  useEffect(() => {
    if (infinite && res.status === 'success') {
      const { payload } = res;

      setPile({
        ...pile,
        ...payload,
        rows: [...pile.rows, ...payload.rows],
      });
    }
  }, [res.status]);

  const value = {
    api,
    filter: { ...query.filter, ...baseFilter },
    query,
    selectable,
    selected: selectable ? selected.map((i) => rows[i]) : [],
    selectedIndex: selected,
    cols,
    activeCols,
    fetched,
    rows,
    res,
    pile,
    refreshCount,

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
