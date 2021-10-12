import React, { useState, useEffect } from 'react';
import get from 'lodash/get';

import ListContext from './ListContext';
import useHttp from '../../hooks/useHttp';
import useComparable from '../../hooks/useComparable';
import useQuery from '../../hooks/useQuery';

const ListProvider = ({
  children,
  api,
  initQuery = { skip: 0, limit: 30 },
  filter: baseFilter = {},
  selectable = false,
  cols = [],
  history = true,
}) => {
  const [activeCols, showCols] = useState(
    () => cols.filter((c) => !c.hide),
  );
  const { res, req, fetched } = useHttp();
  const [query, setQuery] = useState(initQuery);
  const [listFilter, setFilter] = useState({});
  const [selected, setSelected] = useState([]);
  const [staged, setStaged] = useState({});

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

  const stage = (_id, changes = {}) => {
    const s = { ...staged };
    const t = staged[_id];
    const r = rows.find((r0) => r0._id === _id);
    const c = { ...t, ...changes };

    // diff with stored
    Object.keys(c).forEach((k) => {
      if (c[k] === get(r, k)) delete c[k];
    });

    // update staged list
    if (!c || !Object.keys(c).length) {
      // clear
      delete s[_id];
    } else {
      s[_id] = c;
    }

    setStaged(s);
  };

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
    cols,
    activeCols,
    rows,
    res,
    staged,

    fetch,
    refresh,
    select,
    stage,
    showCols,
  };

  return (
    <ListContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ListContext.Provider>
  );
};

export default ListProvider;
