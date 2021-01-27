import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import GridRow from './GridRow.jsx';

const GridContainer = ({
  initValue = [],
  onChange = () => {},
}) => {
  const [rows, setRows] = useState(initValue);
  const [focused, focus] = useState(null);

  const insert = (position = rows.length) => {
    setRows(
      [...rows].splice(position, 0, {}),
    );
  };
  const remove = (position) => {
    setRows([...rows].splice(position, 1));
  };
  const move = (key, position) => {

  };

  return (
    <div className="container-fluid">
      {rows.map((r, i) => (
        <GridRow
          {...r}
          key={i}
          focused={i === focused}
          onFocus={() => focus(i)}
        />
      ))}
      <div
        onClick={() => insert()}
      >
        <FA icon={faPlus} />
      </div>
    </div>
  );
};

export default GridContainer;
