import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Dir from './dir';
import Fil from './fil';
import FilsListItem from './FilsListItem';

const FilsCoverImg = ({
  className = `
    position-relative rounded border ratio ratio-21x9 max-vh-50
  `,
  accept = 'image/png,image/jpeg,image/svg+xml,image/gif',
  ...props
}) => (
  <Dir
    accept={accept}
    {...props}
  >
    {({ files }) => (
      <Dir.Drop className={className}>
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
        <Dir.Click
          alwaysEnable
          className="position-absolute w-100 h-100"
        >
          <div
            className={`
              btn btn-secondary px-3
              position-absolute top-50 start-50 translate-middle-x
            `}
          >
            <FA icon={faPlus} fixedWidth className="me-2" />
            Add or drag image
          </div>
        </Dir.Click>
      </Dir.Drop>
    )}
  </Dir>
);

export default FilsCoverImg;
