import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

const Alert = ({
  theme = 'warning',
  icon,
  children,
  dismissible = true,
}) => {
  const [show, setShow] = useState(true);
  let i = icon;

  if (!i && i !== null) {
    i = theme === 'success' ? faCheckCircle : faExclamationCircle;
  }

  if (!show) return '';

  return (
    <div className={`alert alert-${theme}`}>
      <div className="row gx-3">
        {/* Icon */}
        {i && (
          <div className="col-auto">
            <FA icon={i} />
          </div>
        )}
        {/* Message */}
        <div className="col text-break">
          {children}
        </div>
        {/* Close button */}
        {dismissible && (
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        )}
      </div>
    </div>
  );
};

export default Alert;
