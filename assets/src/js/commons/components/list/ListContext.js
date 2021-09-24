import React from 'react';

export default React.createContext({
  api: { url: '' },
  query: { skip: 0, limit: 0, sort: undefined },
  filter: {},

  // select records
  selectable: false,
  selected: [],
  selectedIndex: [],

  // data
  cols: [],
  activeCols: [],
  rows: [],
  res: {},
  staged: [],

  // actions
  fetch: () => {},
  refresh: () => {},
  select: () => {},
  stage: () => {},
  showCols: () => {},
});
