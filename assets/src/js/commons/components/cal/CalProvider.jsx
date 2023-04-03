import React, { useState, useEffect } from 'react';
import { DateTime as dt } from 'luxon';
import { Calendar } from 'calendar';

import CalContext from './CalContext';
import useHttp from '../../hooks/useHttp';
import useQuery from '../../hooks/useQuery';
import useComparable from '../../hooks/useComparable';
import useAlert from '../alert/useAlert';

const parseDate = (date) => {
  let d = date;

  if (!date) return null;
  if (typeof date === 'string') {
    d = dt.fromISO(date);
  }

  return d.isValid ? d : null;
};

const isDay = (field, entry, d) => {
  if (Array.isArray(field)) {
    const s = parseDate(entry[field[0]]);
    const e = parseDate(entry[field[1]]);

    return d.startOf('day') <= e && d.endOf('day') >= s;
  }

  return parseDate(entry[field]).hasSame(d, 'day');
};

const getGrid = ({ view, date }) => {
  if (view === 'month' || view === 'week') {
    const cal = new Calendar();
    const weeks = cal.monthDates(date.year, date.month - 1)
      .map((w) => w.map((d) => dt.fromJSDate(d)));

    if (view === 'month') {
      return {
        grid: weeks,
        bounds: [
          weeks[0][0].startOf('day'),
          weeks[weeks.length - 1][6].endOf('day'),
        ],
      };
    }

    const week = weeks.find((w) => w.some((d) => d.hasSame(date, 'day')));

    return {
      grid: week,
      bounds: [week[0].startOf('day'), week[6].endOf('day')],
    };
  }

  return {
    grid: date,
    bounds: [date.startOf('day'), date.endOf('day')],
  };
};

const CalProvider = ({
  api,
  initQuery: iq,
  filter: baseFilter = {},
  history = true,
  field = 'createdAt',
  children,
}) => {
  const initQuery = {
    view: 'month',
    date: dt.now().startOf('month'),
    filter: {},
    ...iq,
  };
  const { res, req, fetched } = useHttp();
  const [urlQuery, setUrlQuery] = useQuery();
  const [query, setQuery] = useState(() => {
    const d = parseDate(urlQuery.date);

    return {
      ...initQuery,
      ...(history && {
        ...(urlQuery.view && { view: urlQuery.view }),
        ...d && { date: d },
        ...(urlQuery.filter && { filter: urlQuery.filter }),
      }),
    };
  });
  const [grid, setGrid] = useState([]);

  const fetch = (q = {}) => {
    const newQ = {
      ...query,
      ...q,
      ...q.date && { date: parseDate(q.date) },
    };
    const {
      view, date, filter, ...params
    } = newQ;
    const { grid: g, bounds } = getGrid(newQ);

    setGrid(g);
    setQuery(newQ);
    req({
      ...api,
      params: {
        ...params,
        filter: {
          ...Array.isArray(field) ? {
            [field[0]]: { lte: bounds[1].toISO() },
            [field[1]]: { gte: bounds[0].toISO() },
          } : {
            [field]: {
              gte: bounds[0].toISO(),
              lte: bounds[1].toISO(),
            },
          },
          ...filter,
          ...baseFilter,
        },
      },
    });
  };

  const refresh = () => fetch();

  // http alerts
  useAlert(res, {
    success: false,
  });

  // refresh when filter changed
  useEffect(() => {
    refresh();
  }, [useComparable({ baseFilter, api })]);

  // update url query
  useEffect(() => {
    const { view, date } = query;

    setUrlQuery({
      ...(view !== initQuery.view && { view }),
      ...!initQuery.date.hasSame(date, 'day') && {
        date: date.toFormat('yyyy-MM-dd'),
      },
      filter: query.filter,
    }, true);
  }, [history && useComparable({ query })]);

  const value = {
    api,
    query,
    field,
    fetched,
    events: fetched?.payload?.rows || [],
    grid,

    fetch,
    refresh,
    isDay: (...args) => isDay(field, ...args),
  };

  return (
    <CalContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </CalContext.Provider>
  );
};

export default CalProvider;
