import React, { useState } from 'react';

import startCase from 'lodash/startCase';
import range from 'lodash/range';
import without from 'lodash/without';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

import useList from './useList';
import useEventListener from '../../hooks/useEventListener';

import ListTableCell from './ListTableCell.jsx';

const ListTable = ({
  className = '',
  cols = [],
  onRowClick,
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
  const editable = Boolean(cols.find((c) => c.editable));
  // [x, y]
  const [focused, setFocused] = useState([null, null]);

  // keyboard shortcuts
  useEventListener(window, 'keydown', editable && ((e) => {
    const r = rows.length;
    const c = cols.length;
    const [x, y] = focused;

    switch (e.keyCode) {
      case 37: // left
        if (x) setFocused([x - 1, y]);
        break;
      case 38: // up
        if (y) setFocused([x, y - 1]);
        break;
      case 39: // right
        if (x < c - 1) setFocused([x + 1, y]);
        break;
      case 40: // down
        if (y < r - 1) setFocused([x, y + 1]);
        break;
      default:
        // do nothing
    }
  }), [rows.length, cols.length, focused[0], focused[1]]);

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
        {rows.map((row, r) => (
          <tr
            key={r}
            className={onRowClick ? 'cursor-pointer' : ''}
            onClick={() => {
              if (onRowClick) onRowClick(row, r);
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
                      if (evt.target.checked) select([...selectedIndex, r]);
                      else select(without(selectedIndex, r));
                    }}
                    checked={selectedIndex.includes(r)}
                  />
                </div>
              </td>
            )}
            {cols.map((col, c) => (
              <ListTableCell
                key={c}
                row={row}
                col={col}
                focused={focused[0] === c && focused[1] === r}
                onFocus={() => setFocused([c, r])}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTable;
