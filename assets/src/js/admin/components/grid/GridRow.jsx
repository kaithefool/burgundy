import React, { useState } from 'react';

import GridCell from './GridCell.jsx';

const GridRow = ({
  stretch = false,
  reverse = false,
  cells = [],

  focused,
  onFocus = () => {},
}) => {

  return (
    <div className="row">
      <div className="col">
        Row Ctrls
      </div>
      <div className="col">
        <div className={`
          row ${reverse ? 'flex-row-reverse' : ''}
        `}>
          {cells.map((c, i) => (
            <GridCell
              {...c}
              key={i}
              focused={focused === i}
            />
          ))}
        </div>
      </div>
      <div className="col">
        Row Ctrls
      </div>
    </div>
  );
};

export default GridRow;
