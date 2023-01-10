import React from 'react';

import { SortableHandle } from 'react-sortable-hoc';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import {
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons/faGripVertical';

const DragHandle = SortableHandle(() => (
  <div className="input-group-text cursor-grab">
    <FA icon={faGripVertical} />
  </div>
));

const FormRefItem = ({
  value,
  children,
  sortable = false,
  onRemoved = () => {},
}) => (
  <div className="input-group input-group-input bg-light">
    {sortable && (
      <DragHandle />
    )}
    <div className="input-group-text flex-fill">
      {children(value)}
    </div>
    <button
      className="btn btn-input"
      type="button"
      onClick={onRemoved}
    >
      <FA icon={faTimes} />
    </button>
  </div>
);

export default FormRefItem;
