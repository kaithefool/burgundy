import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

const Toast = ({
  icon,
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
    <div className={`
      toast d-flex align-items-center bg-danger text-white
      showing
    `}>
      <div>
        <FA icon={icon || faExclamationCircle} />
      </div>
      <div className="toast-body">
        {res?.payload}
        {children}
      </div>
      {dismissible && (
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => setShow(false)}
        ></button>
      )}
    </div>
  );
};

export default Toast;
