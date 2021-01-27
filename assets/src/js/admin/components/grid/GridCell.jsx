import React from 'react';

const GridCell = ({
  width,

  onFocus = () => {},
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
