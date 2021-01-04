import React from 'react';

import ListCtrlCreate from './ListCtrlCreate.jsx';
import ListCtrlExport from './ListCtrlExport.jsx';
import ListCtrlImport from './ListCtrlImport.jsx';
import ListCtrlPatch from './ListCtrlPatch.jsx';
import ListCtrlRefresh from './ListCtrlRefresh.jsx';
import ListCtrlRemove from './ListCtrlRemove.jsx';

const defaults = {
  create: ListCtrlCreate,
  export: ListCtrlExport,
  import: ListCtrlImport,
  patch: ListCtrlPatch,
  refresh: ListCtrlRefresh,
  remove: ListCtrlRemove,
};

const ListCtrls = ({
  ctrls = {},
  ...props
}) => {
  const keys = Object.keys(ctrls);

  if (!keys.length) return '';

  return (
    <div className="pb-3">
      {keys.map(
        (k) => <span key={k}>
          {defaults[k]({
            ...props,
            opts: ctrls[k],
          })}
        </span>,
      )}
    </div>
  );
};

export default ListCtrls;
