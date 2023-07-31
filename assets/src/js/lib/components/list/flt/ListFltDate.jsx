import React from 'react';
import { DateTime as dt } from 'luxon';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useList from '../useList';

const parseDate = (date, modifier = (e) => e) => {
  let d = date;

  if (!date) {
    d = null;
  } else if (typeof date === 'string') {
    d = dt.fromISO(date);
  }
  if (!d?.isValid) d = null;
  if (d) d = modifier(d);

  return d ? d.toFormat('yyyy-MM-dd') : '';
};

const ListFltDate = ({
  name, range = false,
  className = 'input-group input-group-input',
}) => {
  const { fetch, query } = useList();
  const value = query?.filter?.[name] ?? {};
  const gte = parseDate(value?.gte);
  const lt = parseDate(value?.lt, (d) => d.minus({ days: 1 }));

  const update = (val) => {
    fetch({
      filter: { ...query.filter, [name]: val },
    });
  };

  return (
    <div className={className}>
      {!range ? (
        <input
          type="date"
          className="form-control"
          value={gte}
          onChange={({ target: { value: val } }) => {
            update(val && {
              gte: parseDate(val),
              lt: parseDate(val, (d) => d.plus({ days: 1 })),
            });
          }}
        />
      ) : (
        <>
          <input
            type="date"
            className="form-control"
            value={gte}
            onChange={({ target: { value: val } }) => {
              const v = parseDate(val);
              const q = { ...value, gte: parseDate(v) };

              if (v && lt && dt.fromISO(v) > dt.fromISO(lt)) {
                q.lt = parseDate(v, (d) => d.plus({ days: 1 }));
              }

              update(q);
            }}
          />
          <span className="input-group-text px-0">
            <FA icon={faArrowRight} size="sm" />
          </span>
          <input
            type="date"
            className="form-control"
            {...gte && { min: gte }}
            value={lt}
            onChange={({ target: { value: val } }) => update({
              ...value, lt: parseDate(val, (d) => d.plus({ days: 1 })),
            })}
          />
        </>
      )}
    </div>
  );
};

export default ListFltDate;
