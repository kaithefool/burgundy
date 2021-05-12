import React, { useState } from 'react';

import startCase from 'lodash/startCase';
import range from 'lodash/range';
import without from 'lodash/without';
import get from 'lodash/get';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

import useList from './useList';
import useEventListener from '../../hooks/useEventListener';

const ListTable = ({
  className = '',
  cols = [],
  onRowClick,
  editable = false,
}) => {
  const {
    rows,
    selectable,
    selectedIndex,
    select,
    fetch,
    query: { sort = {} },
  } = useList();
  const sortBy = Object.keys(sort)[0];
  const sortDir = sort[sortBy];
  const classes = ['table', className];
  // [x, y]
  const [focused, setFocused] = useState([null, null]);

  useEventListener(window, 'keydown', editable && ((e) => {
    switch (e.keyCode) {
      case 37: // left
        setFocused();
        break;
      case 38: // up
        setFocused();
        break;
      case 39: // right
        setFocused();
        break;
      case 40: // down
        setFocused();
        break;
      default:
        // do nothing
    }
  }), []);

  if (onRowClick) {
    classes.push('table-hover');
  }

  return (
    <table className={classes.join(' ')}>
      <thead>
        <tr>
          {selectable && (
            <th scope="col">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={({ target: { checked } }) => {
                    if (checked) select(range(rows.length));
                    else select([]);
                  }}
                  checked={rows.length && selectedIndex.length === rows.length}
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
                  fetch({
                    sort: {
                      [col.key]: sortBy === col.key
                        ? -(sortDir)
                        : -1,
                    },
                  });
                }
              }}
            >
              {col.label || startCase(col.key)}
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
            {selectable && (
              <td>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onClick={(evt) => evt.stopPropagation()}
                    onChange={(evt) => {
                      if (evt.target.checked) select([...selectedIndex, i]);
                      else select(without(selectedIndex, i));
                    }}
                    checked={selectedIndex.includes(i)}
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
