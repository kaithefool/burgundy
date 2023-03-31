import React from 'react';

export default React.createContext({
  api: { url: '' },
  query: {
    view: 'month', date: '', filter: {},
  },
  fetched: [],

  fetch: () => {},
  refresh: () => {},
  isDay: () => {},
});
