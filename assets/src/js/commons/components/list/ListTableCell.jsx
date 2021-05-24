import React, { useState } from 'react';
import get from 'lodash/get';

import useList from './useList';

import GrowingTextarea from '../inputs/GrowingTextarea.jsx';

const ListTableCell = ({
  row,
  col: {
    key,
    getter = (v) => v,
    setter = (v) => v,
    editable = false,
  },
  focused = false,
  onFocus = () => {},
}) => {
  const { stage, staged } = useList();
  const [caret, setCaret] = useState(false);
  const stored = get(row, key);
  let value = stored;

  if (editable) {
    value = get(staged[row.id], key, value);
  }

  // shortcuts
  const onKeydown = (e) => {
    if (caret) {
      // with caret
      switch (e.keyCode) {
        case 27: // escape
          setCaret(false);
          break;
        default:
          // do nothing
      }
    } else {
      // fast editing mode (without caret)
      switch (e.keyCode) {
        case 37: // left
          onFocus([-1, 0]);
          break;
        case 38: // up
          onFocus([0, -1]);
          break;
        case 39: // right
          onFocus([1, 0]);
          break;
        case 40: // down
          onFocus([0, 1]);
          break;
        case 13: // enter
          e.preventDefault();
          setCaret(true);
          break;
        default:
          e.target.value = '';
      }
    }
  };

  return (
    <td
      className={focused ? 'outline-primary' : ''}
      onClick={() => {
        if (editable) {
          if (!focused) {
            onFocus([0, 0]);
          } else {
            setCaret(true);
          }
        }
      }}
    >
      {editable && focused ? (
        <GrowingTextarea
          className={caret ? '' : 'caret-none'}
          autoFocus
          onKeyDown={onKeydown}
          onBlur={() => {
            setCaret(false);
          }}
          onChange={(e) => {
            const v = e.target.value;

            setCaret(true);
            stage(row.id, { [key]: setter(v, row) });
          }}
          value={getter(value, row)}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default ListTableCell;
