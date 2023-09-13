import React from 'react';

import FilTypeIcon from './FilTypeIcon';
import FilName from './FilName';
import FilSize from './FilSize';
import FilPreview from './FilPreview';

const FilThumbnail = ({
  className = 'rounded ratio ratio-1x1',
  labelClassName = 'rounded bg-white border p-3',
  children,
}) => (
  <div
    className={`
      position-relative overflow-hidden
      ${className}
    `}
  >
    <div className={`d-flex align-items-center ${labelClassName}`}>
      <div className="mw-100 text-center m-auto small">
        <div className="display-6">
          <FilTypeIcon fixedWidth />
        </div>
        <div className="mw-100">
          <FilName />
        </div>
        <div className="small text-muted">
          <FilSize />
        </div>
      </div>
    </div>
    <FilPreview player={{ controls: true }} />
    {children}
  </div>
);

export default FilThumbnail;
