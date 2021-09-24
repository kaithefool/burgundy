import React from 'react';
import useList from './useList';

const ListColsToggle = () => {
  const { cols, activeCols, showCols } = useList();

  const toggle = (key, active) => {
    if (active) {
      showCols();
    } else {
      showCols(activeCols.filter((c) => c.key === key));
    }
  };

  const isChecked = (key) => (
    activeCols.find((c) => c.key === key) !== undefined
  );

  return (
    <ul>
      {cols.map((c) => (
        <li key={c.key}>
          <input
            type="checkbox"
            className="form-check-input me-1"
            checked={isChecked(c.key)}
            onChange={(e) => toggle(c.key, e.target.checked)}
          />
          {c.label}
        </li>
      ))}
    </ul>
  );
};

export default ListColsToggle;
