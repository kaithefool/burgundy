import React, { useState } from 'react';

import startCase from 'lodash/startCase';
import range from 'lodash/range';
import without from 'lodash/without';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { useTranslation } from 'react-i18next';

import useList from './useList';

import ListTableCell from './ListTableCell';

const ListTable = ({
  className = '',
  rowLink,
}) => {
  const { t } = useTranslation();
  const {
    activeCols: cols,
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
  // [col, row]
  const [focused, setFocused] = useState([null, null]);

  if (rowLink) {
    classes.push('table-hover');
  }

  return (
    <div className="table-responsive">
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
                {col.label || t(`fields.${col.key}`, startCase(col.key))}
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
                  rowLink={rowLink}
                  focused={focused[0] === c && focused[1] === r}
                  onFocus={([x, y]) => {
                    const f = [c + x, r + y];

                    // if the focused target is within range
                    if (
                      f[0] >= 0 && f[0] < cols.length
                    && f[1] >= 0 && f[1] < rows.length
                    ) {
                      setFocused(f);
                    }
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTable;
