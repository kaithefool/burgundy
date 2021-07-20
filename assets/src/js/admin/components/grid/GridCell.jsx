import React from 'react';

const GridCell = ({
  width,

  onFocus = () => {},
  onChange = () => {},
}) => (
  <div
    className={`
        ${width ? `col-sm-${width * 4}` : 'col'}
      `}
    onClick={() => onFocus()}
  />
);

export default GridCell;
