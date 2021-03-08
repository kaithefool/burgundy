import React from 'react';

export default React.createContext({
  query: { skip: 0, limit: 0, sort: undefined },
  filter: {},
  selected: null,
  rows: [],
  res: {},

  fetch: () => {},
  refresh: () => {},
  select: () => {},
});
