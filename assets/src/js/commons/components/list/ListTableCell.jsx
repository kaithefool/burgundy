import React, { useState, useRef } from 'react';
import get from 'lodash/get';

import useList from './useList';
import useEventListener from '../../hooks/useEventListener';

import GrowingTextarea from '../inputs/GrowingTextarea.jsx';

const ListTableCell = ({
  row,
  col: {
    key,
    getter,
    setter,
    editable = false,
  },
  focused = false,
  onFocus = () => {},
}) => {
  const { stage, findStaged } = useList();
  const [caret, setCaret] = useState(false);
  let value = get(row, key);

  if (getter) value = getter(value, row);

  const [draft, setDraft] = useState(value);

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
        if (editable) onFocus([0, 0]);
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
            setCaret(true);
            setDraft(e.target.value);
          }}
          value={draft}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default ListTableCell;
