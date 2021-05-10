import React, { useState, useEffect } from 'react';
import find from 'lodash/find';

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
  const [stages, setStaged] = useState([]);

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

  const findStaged = (id) => {
    const match = typeof id === 'object'
      ? id : { id };

    return find(stages, match);
  };

  const stage = (id, changes = {}) => {
    const staged = findStaged(id);
    const s = [...stages];

    if (staged) {
      // clear staged
      if (!changes || !Object.keys(changes).length) {
        s.splice(s.indexOf(staged), 1);
      } else {
        s.splice(s.indexOf(staged), 1, changes);
      }
    } else {
      s.push(changes);
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
    rows,
    res,
    stages,

    fetch,
    refresh,
    select,
    stage,
    findStaged,
  };

  return (
    <ListContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ListContext.Provider>
  );
};

export default ListProvider;
