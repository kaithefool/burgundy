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

  return (
    <td>
      {editable ? (
        <textarea
          value={draft}
          onChange={() => setDraft()}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default ListTableCell;
