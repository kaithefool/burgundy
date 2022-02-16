import React from 'react';

import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const FormArrayItemFormset = ({
  helpers,
  index,
  array,
  title,
  sortable,
  children,
}) => (
  <div className="px-4 py-3">
    <div className="border-bottom mb-3">
      <div className="row gx-3 align-items-center">
        <div className="col">
          <strong>{title}</strong>
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

    {children}
  </div>
);

export default FormArrayItemFormset;
