import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

const Alert = ({
  theme = 'danger',
  children,
  dismissible = true,
  res,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (res?.status === 'error') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [res?.status]);

  if (!show) return '';

  return (
    <div className={`alert alert-${theme}`}>
      <div className="row gx-3">
        {/* Icon */}
        <div className="col-auto">
          <FA icon={faExclamationCircle} />
        </div>
        {/* Message */}
        <div className="col text-break">
          {res?.payload}
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
