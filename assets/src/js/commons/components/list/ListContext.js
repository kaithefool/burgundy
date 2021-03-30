import React from 'react';

export default React.createContext({
  api: { url: '' },
  query: { skip: 0, limit: 0, sort: undefined },
  filter: {},
  selectable: false,
  selected: [],
  selectedIndex: [],
  rows: [],
  res: {},

  fetch: () => {},
  refresh: () => {},
  select: () => {},
});
