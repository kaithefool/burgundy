import React from 'react';

const GridCell = ({
  width,

  onFocus = () => {},
  onChange = () => {},
}) => {

  return (
    <div
      className={`
        ${width ? `col-sm-${width * 4}` : 'col'}
      `}
      onClick={() => onFocus()}
    ></div>
  );
};

export default GridCell;
