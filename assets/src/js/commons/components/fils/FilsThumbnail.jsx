import React from 'react';

import Fil from './fil';

const FilsThumbnail = ({
  file,
  children,
}) => (
  <Fil file={file}>
    <div className="position-relative rounded border ratio ratio-1x1 bg-white">
      <div className="text-primary text-center small">
        <div
          className="position-absolute top-50 start-50 translate-middle mw-100"
        >
          <div className="display-6 pt-4 pb-1">
            <Fil.TypeIcon fixedWidth />
          </div>
          <div className="mw-100 px-3">
            <Fil.Name />
          </div>
          <div>
            <small className="text-muted"><Fil.Size /></small>
          </div>
        </div>
      </div>
      <Fil.Preview />
      {children}
    </div>
  </Fil>
);

export default FilsThumbnail;
