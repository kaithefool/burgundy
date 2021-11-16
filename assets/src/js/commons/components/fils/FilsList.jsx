import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Dir from './dir';
import Fil from './fil';

const FilsList = ({
  mode = 'list', // list or gallery
  ...props
}) => (
  <Dir
    {...props}
  >
    {({ files }) => (
      <Dir.Drop>
        <Dir.Click className="d-grid gap-2">
          <div className="btn btn-secondary px-3 text-start">
            <FA icon={faPlus} fixedWidth className="me-2" />
            Add or drag files
          </div>
        </Dir.Click>
        {files.map((f) => (
          <Fil key={f.key} file={f}>
            <div className="rounded bg-white border mb-2">
              <div className="px-3">
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
              <Fil.Progress />
            </div>
          </Fil>
        ))}
      </Dir.Drop>
    )}
  </Dir>
);

export default FilsList;
