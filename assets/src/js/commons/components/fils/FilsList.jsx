import React from 'react';

import Dir from './dir';
import Fil from './fil';

const FilsList = ({
  mode = 'list', // list or gallery
  ...props
}) => (
  <Dir
    {...props}
  >
    {({ files, replace }) => (
      <Dir.Drop>
        <Dir.Click>
          <h6 className="text-center">
            Drag &amp; Drop your files or
            &nbsp;
            <u>Browse</u>
          </h6>
        </Dir.Click>
        {files.map((f, i) => (
          <Fil
            key={f.path || f.key}
            file={f}
            onChange={(v) => replace(i, v)}
          >
            <div className="col">
              <div className="row">
                <div className="col-auto position-relative">
                  <Fil.TypeIcon />
                  <div className="position-absolute w-100 h-100">
                    <Fil.Preview />
                  </div>
                </div>
                <div className="col">
                  <div className="text-truncate">
                    <Fil.Name />
                  </div>
                  <Fil.Size />
                </div>
                <div className="col-auto">
                  <Fil.StatusIcon />
                </div>
              </div>
            </div>
          </Fil>
        ))}
      </Dir.Drop>
    )}
  </Dir>
);

export default FilsList;
