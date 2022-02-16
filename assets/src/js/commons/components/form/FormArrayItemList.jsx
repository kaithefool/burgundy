import React from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const FormArrayItemList = ({
  helpers,
  index,
  title,
  children,
}) => (
  <div className="px-4">
    <div className="row gx-3 align-items-center">
      <div className="col-auto pb-3">
        <strong>{title}</strong>
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
