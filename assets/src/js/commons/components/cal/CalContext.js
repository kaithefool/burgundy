import React from 'react';

export default React.createContext({
  api: { url: '' },
  query: {
    view: 'month', date: '', filter: {},
  },
  field: '',
  fetched: [],
  events: [],
  grid: [],
  views: ['month', 'week', 'day'],

  fetch: () => {},
  refresh: () => {},
  eventDates: () => {},
  isDay: () => {},
  isOverlap: () => {},
  pctInDay: () => {},
});
