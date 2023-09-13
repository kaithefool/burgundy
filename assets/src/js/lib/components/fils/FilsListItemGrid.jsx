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

const FilsGridItem = ({
  file,
  dragHandle = false,
  removeable = true,
}) => (
  <Fil file={file}>
    <Fil.Thumbnail file={file}>
      {/* toolbar */}
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
            {removeable && (
              <div className="col-auto">
                <Fil.Remove className="btn text-neutral" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fil.Thumbnail>
  </Fil>
);

export default FilsGridItem;
