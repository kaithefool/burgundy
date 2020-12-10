import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const BtnHttp = ({
  icon,
  res,
  children,
  disabled,
  className,
  ...props
}) => {
  const { status } = res;
  const i = status === 'pending' ? faSpinner : icon;

  return (
    <button
      {...props}
      disabled={status === 'pending' || disabled}
      className={`
        ${className}
        ${status === 'error' ? 'btn-danger' : ''}
      `}
    >
      {i && (
        <FA
          icon={i}
          fixedWidth
          pulse={res.status === 'pending'}
        />
      )}
      {children}
    </button>
  );
};

export default BtnHttp;
