import React from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const FormArrayItemList = ({
  helpers,
  index,
  title,
  children,
  sortable,
  dragHandleProps,
  isDragging = false,
}) => (
  <div className={`px-4 ${isDragging ? 'opacity-50' : ''}`}>
    <div className="row gx-3 align-items-center">
      {sortable && (
        <div
          className="col-auto pb-3 text-muted"
          {...dragHandleProps}
        >
          <FA icon={faGripVertical} />
        </div>
      )}
      <div className="col-auto pb-3">
        {title}
      </div>
      <div className="col">
        {children}
      </div>
      <div className="col-auto pb-3">
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
