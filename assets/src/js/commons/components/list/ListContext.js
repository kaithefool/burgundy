import React from 'react';

export default React.createContext({
  api: { url: '' },
  query: { skip: 0, limit: 0, sort: undefined },
  filter: {},
  selected: null,
  rows: [],
  res: {},

  fetch: () => {},
  refresh: () => {},
  select: () => {},
});
