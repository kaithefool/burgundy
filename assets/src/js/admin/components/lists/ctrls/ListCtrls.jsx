import React from 'react';

import ListCtrlCreate from './ListCtrlCreate.jsx';
import ListCtrlRemove from './ListCtrlRemove.jsx';

const ListCtrls = ({
  ctrls,
  ...props
}) => (
  <div className="pb-3">
    {ctrls.create && <ListCtrlCreate {...props} />}
    {ctrls.remove && <ListCtrlRemove {...props} />}
  </div>
);

export default ListCtrls;
