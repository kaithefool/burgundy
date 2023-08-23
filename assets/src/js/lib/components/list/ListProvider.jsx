import React, { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import qs from 'qs';

import ListContext from './ListContext';
import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';
import useDidUpdate from '../../hooks/useDidUpdate';
import useQuery from '../../hooks/useQuery';
import useAlert from '../alert/useAlert';
import useList from './useList';

const parseUrlQuery = (q = {}) => {
  const d = { ...q };

  if (d.skip) d.skip = Number(d.skip);
  if (d.limit) d.limit = Number(d.limit);

  return d;
};

const isEqualQuery = (q, urlQ) => isEqual(
  qs.parse(qs.stringify(q), { ignoreQueryPrefix: true }),
  qs.parse(qs.stringify(urlQ), { ignoreQueryPrefix: true }),
);

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
  const [rawUrlQuery, setUrlQuery] = useQuery();
  const urlQuery = parseUrlQuery(rawUrlQuery);
  const [activeCols, showCols] = useState(
    () => cols.filter((c) => !c.hide),
  );
  const { res, req, fetched } = useHttp();
  const [pile, setPile] = useState({ rows: [] });
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState(() => ({
    ...initQuery,
    ...(history && urlQuery),
  }));
  const [refreshCount, setRefreshCount] = useState(0);
  const isOutOfSync = history && !isEqualQuery(
    query,
    { ...initQuery, ...urlQuery },
  );

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

    // set state
    setQuery(newQ);

    // update url query
    if (history) {
      const { skip, limit, filter } = newQ;

      setUrlQuery({
        ...(skip !== initQuery.skip && { skip }),
        ...(limit !== initQuery.limit && { limit }),
        filter,
      }, true);
    }

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
  useAlert(res, { success: false });

  // toggle cols
  useEffect(() => {
    showCols(cols.filter((c) => !c.hide));
  }, [useComparable(cols)]);

  // init fetch
  useEffect(() => {
    if (!lazying) fetch();
  }, []);

  // refresh when api or base filter changed
  useDidUpdate(() => {
    fetch(initQuery);
  }, [useComparable({ baseFilter, api })]);

  // when url query changed
  useEffect(() => {
    if (isOutOfSync) { fetch(urlQuery); }
  }, [isOutOfSync]);

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
