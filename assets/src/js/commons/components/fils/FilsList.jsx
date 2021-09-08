import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons/faTimesCircle';

import Dir from './dir';
import Fil from './fil';

const FilsList = ({
  mode = 'list', // list or gallery
  ...props
}) => (
  <Dir
    {...props}
  >
    {({ files, replace, remove }) => (
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
            key={f.key}
            file={f}
            onChange={(v) => replace(i, v)}
          >
            <div className="col card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="position-relative">
                      {/* <div className="position-absolute w-100 h-100">
                        <Fil.Preview />
                      </div> */}
                      <Fil.TypeIcon size="2x" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="text-truncate">
                      <Fil.Name />
                    </div>
                    <small><Fil.Size /></small>
                  </div>
                  <div className="col-auto">
                    <Fil.StatusIcon size="lg" />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => remove(i)}
                    >
                      <FA icon={faTimesCircle} size="lg" />
                    </button>
                  </div>
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
