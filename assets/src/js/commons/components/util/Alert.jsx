import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

const Alert = ({
  theme = 'danger',
  sticky = false,
  children,
  onClose,
}) => (
  <div
    className={`alert alert-${theme} ${sticky ? 'position-sticky' : ''}`}
    style={sticky ? { top: '15px' } : {}}
  >
    <div className="form-row">
      {/* Icon */}
      <div className="col-auto">
        <FA icon={faExclamationCircle} />
      </div>
      {/* Message */}
      <div className="col text-break">
        {children}
      </div>
      {/* Close button */}
      {onClose && (
        <div className="col-auto">
          <button
            type="button"
            className="close"
            onClick={onClose}
          >
            <small><FA icon={faTimes} /></small>
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Alert;
