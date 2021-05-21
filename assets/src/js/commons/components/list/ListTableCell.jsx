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
  let value = get(row, key);

  if (getter) value = getter(value, row);

  const [draft, setDraft] = useState(value);

  // shortcuts
  // useEventListener(
  //   window,
  //   'keydown',
  //   focused && ((e) => {
  //     switch (e.keyCode) {
  //       case 13: // enter
  //
  //         break;
  //       case 27: // escape
  //
  //         break;
  //       default:
  //         // do nothing
  //     }
  //   }, []),
  // );

  return (
    <td
      className={focused ? 'outline-primary' : ''}
      onClick={() => {
        if (editable) onFocus();
      }}
    >
      {editable && focused ? (
        <GrowingTextarea
          onChange={(e) => setDraft(e.target.value)}
          value={draft}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default ListTableCell;
