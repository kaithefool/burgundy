import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';

import Fil from './fil';

const FilsListItem = ({
  file,
  dragHandleProps,
  ...props
}) => (
  <Fil file={file}>
    <div
      className="rounded bg-white border"
      {...props}
    >
      <Fil.Progress />
      <div className="px-3">
        <div className="row g-2 align-items-center">
          {dragHandleProps && (
            <div
              className="col-auto text-muted"
              {...dragHandleProps}
            >
              <FA icon={faGripVertical} fixedWidth />
            </div>
          )}
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
    </div>
  </Fil>

);

export default FilsListItem;
