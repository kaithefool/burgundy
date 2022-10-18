import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

import useTimer from '../../hooks/useTimer';

const BtnHttp = ({
  icon,
  res,
  children,
  disabled,
  className = '',
  onClick = () => {},
  retry: retryOpts,
  ...props
}) => {
  const { status } = res;
  const i = status === 'pending' ? faSpinner : icon;
  const [paused, setPaused] = useState(false);
  const { t } = useTranslation();
  const retry = retryOpts && {
    interval: { seconds: 30 },
    max: 3,
    ...retryOpts,
  };

  const { start, timeLeft } = useTimer(
    () => setPaused(false),
    retry?.interval || 0,
    false,
  );

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
        if (retry) {
          setPaused(true); start();
        }
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
      {
        paused
          ? t('retryAfter', { seconds: timeLeft.toFormat('s') })
          : children
      }
    </button>
  );
};

export default BtnHttp;
