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
  const [, newKey] = useUniqKey();
  const [focusedCell, focusCell] = useState(null);

  useEffect(() => {
    if (!focused) focusCell(null);
  }, [focused]);

  const insert = (position = cells.length) => {
    const d = [...cells];

    d.splice(position, 0, { tmpId: newKey() });
    onChange(d);
  };
  const remove = (position) => {
    const d = [...cells];

    d.splice(position, 1);
    onChange(d);
  };
  const move = (from, to) => {
    const d = [...cells];

    d.splice(to, 0, d.splice(from, 1));
    onChange(d);
  };
  const change = (i, chg) => {
    const d = [...cells];

    d.splice(i, 1, chg);
    onChange(d);
  };

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
              key={c.id || c.tmpId}
              focused={focusedCell === i}

              onFocus={() => {
                focusCell(i);
                onFocus();
              }}
              onChange={(chg) => change(i, chg)}
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
