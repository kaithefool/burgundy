import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';

const FormArrayItem = ({
  helpers,
  value,
  index,
  item,
  tmpl = 'formset',
  sortable = true,
  children,
  title = (i) => `${i + 1}.`,
}) => {
  const t = title(index, item);
  const body = children(index, item, helpers);
  const rmBtn = (
    <button
      className="btn"
      type="button"
      onClick={() => helpers.remove(index)}
    >
      <FA icon={faTimes} />
    </button>
  );

  if (tmpl === 'formset') {
    return (
      <div className="px-4 py-3">
        <div className="border-bottom mb-3">
          <div className="row gx-3 align-items-center">
            <div className="col">
              <strong>{t}</strong>
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
                    disabled={index >= value.length - 1}
                    onClick={() => helpers.swap(index, index + 1)}
                  >
                    <FA icon={faArrowDown} />
                  </button>
                </div>
              </>
            )}
            <div className="col-auto">{rmBtn}</div>
          </div>
        </div>

        {body}
      </div>
    );
  }

  if (tmpl === 'list') {
    return (
      <div className="px-4">
        <div className="row gx-3 align-items-center">
          <div className="col-auto pb-3">
            <strong>{t}</strong>
          </div>
          <div className="col">
            {body}
          </div>
          <div className="col-auto pb-3">{rmBtn}</div>
        </div>
      </div>
    );
  }

  return body;
};

export default FormArrayItem;
