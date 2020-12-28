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
  ctrls,
  children,
  ...props
}) => (
  <div className="pb-3">
    {Object
      .keys(ctrls)
      .map(
        (k) => defaults[k]({
          ...props,
          key: k,
          opts: ctrls[k],
        }),
      )
    }
    {children}
  </div>
);

export default ListCtrls;
