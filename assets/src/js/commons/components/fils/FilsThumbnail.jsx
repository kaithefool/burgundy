import React from 'react';

import Fil from './fil';

const FilsThumbnail = ({
  className = 'rounded ratio ratio-1x1',
  labelClassName = 'rounded bg-white border p-3',
  file,
  children,
}) => (
  <Fil file={file}>
    <div
      className={`
        position-relative overflow-hidden
        ${className}
      `}
    >
      <div className={`d-flex align-items-center ${labelClassName}`}>
        <div className="mw-100 text-center m-auto small">
          <div className="display-6">
            <Fil.TypeIcon fixedWidth />
          </div>
          <div className="mw-100">
            <Fil.Name />
          </div>
          <div className="small text-muted">
            <Fil.Size />
          </div>
        </div>
      </div>
      <Fil.Preview />
      {children}
    </div>
  </Fil>
);

export default FilsThumbnail;
