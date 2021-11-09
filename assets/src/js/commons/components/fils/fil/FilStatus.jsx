import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons/faFan';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import useFil from './useFil';

const FilStatus = ({
  className,
  ...props
}) => {
  const { http } = useFil();
  const { progress, status } = http.res;

  if (!status) return '';

  const icon = {
    pending: { icon: faFan, spin: true },
    error: { icon: faExclamationCircle },
    success: { icon: faCheck },
  }[status];
  const color = {
    pending: '',
    error: 'text-danger',
    success: 'text-success',
  }[status];

  return (
    <>
      <FA
        className={`${color} ${className}`}
        fixedWidth
        {...icon}
        {...props}
      />
      {status === 'pending' && (
        <span>{`${Math.round(progress * 100)}%`}</span>
      )}
    </>
  );
};

export default FilStatus;
