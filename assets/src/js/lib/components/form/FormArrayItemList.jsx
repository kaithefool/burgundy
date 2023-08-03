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
  listLabel,
  sortable,
  removeable,
}) => (
  <div className="px-4">
    <div className="row gx-0">
      {sortable && (
        <div className="col-auto text-muted">
          {listLabel && <div className="form-label">&nbsp;</div>}
          <div className="btn">
            <DragHandle />
          </div>
        </div>
      )}
      {title && (
        <div className="col-auto font-monospace">
          {listLabel && <div className="form-label">&nbsp;</div>}
          <div className="btn">
            {title}
          </div>
        </div>
      )}
      <div className="col">
        {children}
      </div>
      {removeable && (
        <div className="col-auto">
          {listLabel && <div className="form-label">&nbsp;</div>}
          <button
            className="btn"
            type="button"
            onClick={() => helpers.remove(index)}
          >
            <FA icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  </div>
);

export default FormArrayItemList;
