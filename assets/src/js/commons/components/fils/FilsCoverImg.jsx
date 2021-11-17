import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Dir from './dir';
import Fil from './fil';
import FilsListItem from './FilsListItem';

const FilsCoverImg = ({
  className = 'rounded border ratio ratio-21x9 max-vh-50',
  ...props
}) => (
  <Dir
    {...props}
  >
    {({ files }) => (
      <Dir.Drop className={`position-reative ${className}`}>
        <Dir.Click className="position-absolute w-100 h-100">
          <div
            className={`
              btn btn-secondary px-3
              position-absolute top-50 start-50 translate-middle
            `}
          >
            <FA icon={faPlus} fixedWidth className="me-2" />
            Add or drag files
          </div>
        </Dir.Click>
        {files[0] && (
          <Fil file={files[0]}>
            <div
              className="h-auto bg-white"
              style={{ zIndex: 1 }}
            >
              <Fil.Progress />
              <FilsListItem />
            </div>
            <Fil.Preview />
          </Fil>
        )}
      </Dir.Drop>
    )}
  </Dir>
);

export default FilsCoverImg;
