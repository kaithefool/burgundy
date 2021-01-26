import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import GridRow from './GridRow.jsx';

const GridContainer = () => {
  const [rows, setRows] = useState([]);
  const [focused, focus] = useState({ row: null, cell: null });

  const insertRow = (position = rows.length) => {
    setRows(
      [...rows].splice(position, 0, {}),
    );
  };

  return (
    <div className="container-fluid">
      {rows.map((r, i) => (
        <GridRow
          {...r}
          key={i}
          focused={i === focused.row}
          onFocus={(cell) => focus({ row: i, cell })}
        />
      ))}
      <div
        onClick={() => insertRow()}
      >
        <FA icon={faPlus} />
      </div>
    </div>
  );
};

export default GridContainer;
