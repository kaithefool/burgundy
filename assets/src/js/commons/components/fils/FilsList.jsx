import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Dir from './dir';
import Fil from './fil';
import FilsListItem from './FilsListItem';

const FilsList = (props) => (
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
              <Fil.Progress />
              <FilsListItem />
            </div>
          </Fil>
        ))}
      </Dir.Drop>
    )}
  </Dir>
);

export default FilsList;
