import React from 'react';
import startCase from 'lodash/startCase';
import range from 'lodash/range';
import without from 'lodash/without';
import get from 'lodash/get';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

const ListTable = ({
  className = '',
  cols = [],
  rows = [],
  onRowClick,
  selected,
  onSelect = () => {},
  sort = {},
  onSort = () => {},
}) => {
  const sortBy = Object.keys(sort)[0];
  const sortDir = sort[sortBy];
  const classes = ['table', className];

  if (onRowClick) {
    classes.push('table-hover');
  }

  return (
    <table className={classes.join(' ')}>
      <thead>
        <tr>
          {selected && (
            <th scope="col">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={({ target: { checked } }) => {
                    if (checked) onSelect(range(rows.length));
                    else onSelect([]);
                  }}
                  checked={rows.length && selected.length === rows.length}
                />
              </div>
            </th>
          )}
          {cols.map((col) => (
            <th
              key={col.key}
              className={col.sortable ? 'cursor-pointer' : ''}
              onClick={() => {
                if (col.sortable) {
                  onSort({
                    [col.key]: sortBy === col.key
                      ? -(sortDir)
                      : -1,
                  });
                }
              }}
            >
              {col.children || startCase(col.key)}
              {col.sortable && col.key === sortBy && (
                <span className="ms-1">
                  <FA
                    icon={sortDir === 1 ? faAngleUp : faAngleDown}
                  />
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className={onRowClick ? 'cursor-pointer' : ''}
            onClick={() => {
              if (onRowClick) onRowClick(row, i);
            }}
          >
            {selected && (
              <td>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={({ target: { checked } }) => {
                      if (checked) onSelect([...selected, i]);
                      else onSelect(without(selected, i));
                    }}
                    checked={selected.includes(i)}
                  />
                </div>
              </td>
            )}
            {cols.map(({ key, getter }) => {
              let value = get(row, key);

              if (getter) value = getter(value, row);

              return (
                <td key={key}>
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTable;
