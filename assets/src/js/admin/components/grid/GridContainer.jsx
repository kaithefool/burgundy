import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import GridRow from './GridRow.jsx';
import useUniqKey from '~/commons/hooks/useUniqKey';

const GridContainer = ({
  initValue = [],
  onChange = () => {},
}) => {
  const [, newKey] = useUniqKey();
  const [rows, setRows] = useState(initValue);
  const [focused, focus] = useState(null);

  const update = (draft) => {
    // omit tmpIds
    const d = draft.map(({ tmpId, ...r }) => ({
      ...r,
      cells: r.cells.map(({ tmpId: t, ...c }) => c),
    }));

    setRows(draft);
    onChange(d);
  };
  const insert = (position = rows.length) => {
    const d = [...rows];

    d.splice(position, 0, { tmpId: newKey() });
    update(d);
  };
  const remove = (position) => {
    const d = [...rows];

    d.splice(position, 1);
    update(d);
  };
  const move = (from, to) => {
    const d = [...rows];

    d.splice(to, 0, d.splice(from, 1));
    update(d);
  };
  const change = (i, chg) => {
    const d = [...rows];

    d.splice(i, 1, chg);
    update(d);
  };

  return (
    <div className="container-fluid">
      {rows.map((r, i) => (
        <GridRow
          {...r}
          key={r.tmpId}
          position={i}
          focused={i === focused}

          onFocus={() => focus(i)}
          onInsert={(incr) => insert(i + incr)}
          onRemove={() => remove(i)}
          onMove={(incr) => move(i, i + incr)}
          onChange={(chg) => change(i, chg)}
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
