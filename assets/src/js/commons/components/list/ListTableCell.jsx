import React, { useState, useEffect, useRef } from 'react';
import get from 'lodash/get';

import useList from './useList';

import GrowingTextarea from '../inputs/GrowingTextarea';

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
  const prevDraft = useRef(value);

  if (editable) {
    value = get(staged[row._id], key, value);
  }

  // store for escape button
  useEffect(() => {
    if (editable && focused) {
      prevDraft.current = value;
    }
  }, [focused]);

  // shortcuts
  const onKeydown = (e) => {
    const k = e.keyCode;

    if (caret) { // with caret (non fast editing mode)
      if (k === 27) { // escape
        setCaret(false);
        // revert to prev draft
        stage(row._id, { [key]: prevDraft.current });
      }
    } else if (k === 13) { // enter
      e.preventDefault();
      setCaret(true);
    } else if (k === 37) { // left
      onFocus([-1, 0]);
    } else if (k === 38) { // up
      onFocus([0, -1]);
    } else if (k === 39 || k === 9) { // right or tab
      onFocus([1, 0]);
    } else if (k === 40) { // down
      onFocus([0, 1]);
    } else if (
      k === 9 // tab
      || (k >= 16 && k <= 20) // modifiers
      || (k >= 91 && k <= 95) // os
      || (k >= 112 && k <= 151) // f keys and locks
      || k === 224 // command key (firefox)
    ) {
      // do nothing
    } else {
      e.target.value = '';
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
            stage(row._id, { [key]: setter(v, row) });
          }}
          value={getter(value, row)}
        />
      ) : (
        getter(value, row)
      )}
    </td>
  );
};

export default ListTableCell;
