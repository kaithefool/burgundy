import React from 'react';

import ListCtrlCreate from './ListCtrlCreate.jsx';
import ListCtrlRemove from './ListCtrlRemove.jsx';

const defaults = {
  create: ListCtrlCreate,
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
  </div>
);

export default ListCtrls;
