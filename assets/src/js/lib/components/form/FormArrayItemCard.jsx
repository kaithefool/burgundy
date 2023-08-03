import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import {
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const DragHandle = SortableHandle(() => (
  <span className="cursor-grab">
    <FA icon={faGripVertical} fixedWidth />
  </span>
));

const FormArrayItemCard = ({
  helpers,
  index,
  array,
  title,
  sortable,
  removeable,
  children,
}) => (
  <div className="card mb-3">
    <div className="card-body">
      <div className="card-title">
        <div className="row gx-2 align-items-center">
          {sortable && (
            <div className="col-auto text-muted">
              <DragHandle />
            </div>
          )}
          <div className="col">
            <label>{title}</label>
          </div>
          {sortable && (
            <>
              <div className="col-auto">
                <button
                  className="btn"
                  type="button"
                  disabled={index <= 0}
                  onClick={() => helpers.swap(index, index - 1)}
                >
                  <FA icon={faArrowUp} />
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn"
                  type="button"
                  disabled={index >= array.length - 1}
                  onClick={() => helpers.swap(index, index + 1)}
                >
                  <FA icon={faArrowDown} />
                </button>
              </div>
            </>
          )}
          {removeable && (
            <div className="col-auto">
              <button
                className="btn text-primary"
                type="button"
                onClick={() => helpers.remove(index)}
              >
                <FA icon={faTimes} />
              </button>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  </div>
);

export default FormArrayItemCard;
