import React from 'react';

import Fil from './fil';

const FilsListItem = ({
  className = 'px-3',
  ...props
}) => (
  <div
    className={className}
    {...props}
  >
    <div className="row g-2 align-items-center">
      <div className="col-auto text-primary">
        <Fil.TypeIcon fixedWidth />
      </div>
      <div className="col">
        <Fil.Name />
      </div>
      <div className="col-auto">
        <small className="text-muted"><Fil.Size /></small>
      </div>
      <div className="col-auto">
        <Fil.Status />
      </div>
      <div className="col-auto">
        <Fil.Remove className="btn text-secondary" />
      </div>
    </div>
  </div>
);

export default FilsListItem;
