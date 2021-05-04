import React, { useState } from 'react';
import get from 'lodash/get';

import useList from './useList';

const ListTableCell = ({
  row,
  col: {
    key,
    getter,
    editable = false,
  },
}) => {
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
