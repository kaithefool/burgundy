import React, { useState } from 'react';
import get from 'lodash/get';

import useList from './useList';
import useEventListener from '../../hooks/useEventListener';

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
  const [draft, setDraft] = useState('');

  let value = get(row, key);

  if (getter) value = getter(value, row);

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
      {editable ? (
        <div
          onChange={() => setDraft()}
          contentEditable
        ></div>
      ) : (
        value
      )}
    </td>
  );
};

export default ListTableCell;
