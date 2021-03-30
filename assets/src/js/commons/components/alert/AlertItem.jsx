import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

import useTimeout from '../../hooks/useTimeout';
import useAlert from './useAlert';

const defaultIcon = (theme) => ({
  danger: faExclamationCircle,
  warning: faExclamationCircle,
  info: faInfoCircle,
  success: faCheckCircle,
})[theme];

const AlertItem = ({
  className = '',
  id,
  theme,
  icon,
  children,
  expires,
}) => {
  const { remove } = useAlert();
  const rm = () => remove(id);
  const ic = icon !== false && !icon
    ? defaultIcon(theme) : icon;

  useTimeout(expires ? rm : () => {}, expires);

  return (
    <div
      className={`
        toast show ${className}
        ${theme ? `bg-${theme} text-white border-0` : ''}
      `}
    >
      <div className="d-flex align-items-center">
        {ic && (
          <div className="ms-3">
            <FA icon={ic} size="lg" />
          </div>
        )}
        <div className="toast-body">
          {children}
        </div>
        <button
          type="button"
          className={`
            btn-close ${theme ? 'btn-close-white' : ''}
            m-auto me-2
          `}
          onClick={rm}
        />
      </div>
    </div>
  );
};

export default AlertItem;
