import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons/faGripVertical';

import Fil from './fil';

const DragHandle = SortableHandle(() => (
  <span className="cursor-grab">
    <FA icon={faGripVertical} fixedWidth />
  </span>
));

const FilsListItemList = ({
  file,
  dragHandle = false,
}) => (
  <Fil file={file}>
    <div className="position-relative rounded border bg-white">
      <Fil.Progress />
      <div className="px-3">
        <div className="row g-2 align-items-center">
          {dragHandle && (
            <div className="col-auto text-muted">
              <DragHandle />
            </div>
          )}
          <div className="col-auto text-primary">
            <Fil.TypeIcon fixedWidth />
          </div>
          <div className="col">
            <Fil.Name link />
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

export default FilsListItemList;
