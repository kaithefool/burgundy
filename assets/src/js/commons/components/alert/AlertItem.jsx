import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

import useTimeout from '../../hooks/useTimeout';
import useAlert from './useAlert';

const defaultIcon = () => ({
  danger: faExclamationCircle,
  warning: faExclamationCircle,
  info: faInfoCircle,
  success: faCheckCircle,
});

const AlertItem = ({
  key,
  theme,
  icon,
  children,
  expires,
}) => {
  const { remove } = useAlert();
  const rm = () => remove(key);
  const ic = icon !== false && !icon
    ? defaultIcon(theme) : icon;

  useTimeout(expires ? rm : () => {}, expires);

  return (
    <div
      className={`
        toast
        ${theme ? `bg-${theme} text-white border-0` : ''}
      `}
    >
      <div className="d-flex align-items-center">
        {ic && (
          <div>
            <FA icon={ic} />
          </div>
        )}
        <div className="toast-body">
          {children}
        </div>
        <button
          type="button"
          className={`
            btn-close${theme ? '-white' : ''}
            mx-auto m-auto
          `}
          onClick={rm}
        />
      </div>
    </div>
  );
};

export default AlertItem;
