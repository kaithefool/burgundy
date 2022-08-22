import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import {
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const DragHandle = SortableHandle(() => (
  <span className="cursor-grab">
    <FA icon={faGripVertical} fixedWidth />
  </span>
));

const FormArrayItemList = ({
  helpers,
  index,
  title,
  children,
  sortable,
}) => (
  <div className="px-4">
    <div className="row gx-3">
      {sortable && (
        <div className="col-auto pt-2 text-muted">
          <DragHandle />
        </div>
      )}
      {title && (
        <div className="col-auto pt-2 font-monospace">
          {title}
        </div>
      )}
      <div className="col">
        {children}
      </div>
      <div className="col-auto">
        <button
          className="btn"
          type="button"
          onClick={() => helpers.remove(index)}
        >
          <FA icon={faTimes} />
        </button>
      </div>
    </div>
  </div>
);

export default FormArrayItemList;
