import React from 'react';

export default React.createContext({
  api: { url: '' },
  query: {
    view: 'month', date: '', filter: {},
  },
  fetched: [],
  grid: [],

  fetch: () => {},
  refresh: () => {},
  eventDates: () => {},
  isDay: () => {},
  isOverlap: () => {},
  pctInDay: () => {},
});
