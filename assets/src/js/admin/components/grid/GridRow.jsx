import React, { useState, useEffect } from 'react';

import GridCell from './GridCell.jsx';
import useUniqKey from '~/commons/hooks/useUniqKey';

const GridRow = ({
  stretch = false,
  reverse = false,
  cells = [],

  focused,
  onFocus = () => {},
  onChange = () => {},
}) => {
  const [focusedCell, focusCell] = useState(null);

  useEffect(() => {
    if (!focused) focusCell(null);
  }, [focused]);

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
              focused={focusedCell === i}

              onFocus={() => {
                focusCell(i);
                onFocus();
              }}
              onChange={(chg) => {
                const d = [...cells].splice(i, 1, chg);

                onChange(d);
              }}
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
