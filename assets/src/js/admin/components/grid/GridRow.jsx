import React from 'react';

const GridRow = ({
  stretch = false,
  direction = 'row',
  cells = [],
  onFocus = () => {},
}) => {

  return (
    <div className="row"></div>
  );
};

export default GridRow;
