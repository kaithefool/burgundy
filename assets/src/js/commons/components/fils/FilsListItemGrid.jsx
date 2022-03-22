import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';

import Fil from './fil';

const DragHandle = SortableHandle(() => (
  <span className="cursor-grab">
    <FA icon={faGripVertical} fixedWidth />
  </span>
));

const FilsGridItem = ({
  dragHandle = false,
}) => (
  <div className="position-relative rounded border ratio ratio-1x1 bg-white">
    <div className="text-primary text-center small">
      <div className="position-absolute top-50 start-50 translate-middle mw-100">
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
    <div
      className="h-auto"
      style={{ zIndex: 1 }}
    >
      {/* background */}
      <div className="bg-white position-absolute h-100 w-100 opacity-75" />
      {/* info */}
      <Fil.Progress />
      <div className="position-relative ps-3 pe-2">
        <div className="row g-2 align-items-center justify-content-end">
          {dragHandle && (
            <div className="col text-muted">
              <DragHandle />
            </div>
          )}
          <div className="col-auto">
            <Fil.Status />
          </div>
          <div className="col-auto">
            <Fil.Remove className="btn text-secondary" />
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default FilsGridItem;
