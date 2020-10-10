import React from 'react';
import startCase from 'lodash/startCase';
import range from 'lodash/range';
import without from 'lodash/without';
import get from 'lodash/get';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

import Form from 'react-bootstrap/Form';

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
  const classes = ['table'];

  if (onRowClick) {
    classes.push('table-hover');
  }

  classes.push(className);

  return (
    <table className={classes.join(' ')}>
      <thead>
        <tr>
          {selected && (
            <th scope="col">
              <Form.Check
                custom
                type="checkbox"
                onChange={(v) => {
                  if (v) onSelect(range(rows.length));
                  else onSelect([]);
                }}
                value={rows.length && selected.length === rows.length}
              />
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
                <span className="ml-2">
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
                <Form.Check
                  custom
                  onChange={(v) => {
                    if (v) onSelect([...selected, i]);
                    else onSelect(without(selected, i));
                  }}
                  value={selected.includes(i)}
                />
              </td>
            )}
            {cols.map(({ key, getter }) => {
              let data = get(row, key);

              if (getter) data = getter(data, row);

              return (
                <td key={key}>
                  {data}
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
