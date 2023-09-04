import React, { useState, useEffect } from 'react';

import ListContext from './ListContext';
import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';
import useDidUpdate from '../../hooks/useDidUpdate';
import useAlert from '../alert/useAlert';
import useList from './useList';
import useListQuery from './useListQuery';

const ListProvider = (props) => {
  const {
    children,
    api,
    filter: baseFilter = {},
    selectable = false,
    cols = [],
    lazy = false,
    infinite = false,
    rows: nonHttpRows,
  } = props;

  const [activeCols, showCols] = useState(
    () => cols.filter((c) => !c.hide),
  );
  const { res, req, fetched } = useHttp();
  const [pile, setPile] = useState({ rows: [] });
  const [selected, setSelected] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const { query, setQuery, initQuery } = useListQuery(props);
  const reqOpts = {
    ...api,
    params: { ...query, filter: { ...query.filter, ...baseFilter } },
  };

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

    // set state to trigger request
    setQuery(newQ);
  };

  const refresh = () => {
    if (infinite) setPile({ rows: [] });
    setRefreshCount(refreshCount + 1);
  };

  // parent
  useList({ onRefresh: refresh });

  // http alerts
  useAlert(res, { success: false });

  // toggle cols
  useEffect(() => {
    showCols(cols.filter((c) => !c.hide));
  }, [useComparable(cols)]);

  // make request when query changed
  useEffect(() => {
    if (!nonHttpRows && !lazying) {
      req(reqOpts);
    }
  }, [useComparable(reqOpts), refreshCount]);

  // refresh when api or base filter changed
  useDidUpdate(() => {
    fetch(initQuery);
  }, [useComparable({ baseFilter, api })]);

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
    select: (s) => setSelected(s),
    showCols,
  };

  return (
    <ListContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ListContext.Provider>
  );
};

export default ListProvider;
