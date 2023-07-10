import React, { useEffect } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

import useRetry from '../../hooks/useRetry';

const BtnHttp = ({
  icon,
  res,
  children,
  disabled,
  className = '',
  onClick = () => {},
  retry,
  ...props
}) => {
  const { status } = res;
  const i = status === 'pending' ? faSpinner : icon;
  const { paused, attempt, error } = useRetry(retry);

  useEffect(() => {
    if (retry && status && (status === 'error' || retry.always)) attempt();
  }, [status]);

  return (
    <button
      type="button"
      {...props}
      disabled={status === 'pending' || paused || disabled}
      className={`
        btn
        ${className}
        ${status === 'error' ? 'btn-danger' : ''}
      `}
      onClick={function btnHttpOnClick(...args) {
        onClick.apply(this, args);
      }}
    >
      {i && (
        <FA
          icon={i}
          fixedWidth
          pulse={res.status === 'pending'}
        />
      )}
      {i && children && ' '}
      {error || children}
    </button>
  );
};

export default BtnHttp;
