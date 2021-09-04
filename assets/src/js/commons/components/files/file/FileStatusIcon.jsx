import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons/faFan';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import useFile from './useFile';

const FileStatusIcon = ({
  className,
  ...props
}) => {
  const { http } = useFile();
  const { progress, status } = http.res;

  if (!status) return '';

  const icon = {
    pending: { icon: faFan, spin: true },
    error: { icon: faExclamationCircle },
    success: { icon: faCheckCircle },
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
      {progress !== null && (
        <span>{`${Math.round(progress * 100)}%`}</span>
      )}
    </>
  );
};

export default FileStatusIcon;
