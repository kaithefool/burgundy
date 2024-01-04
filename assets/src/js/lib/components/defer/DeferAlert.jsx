import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import useTimeout from '~/lib/hooks/useTimeout';
import useDefer from './useDefer';

/**
 *
 * @component
 * @param {import('./DeferContext').Log} props
 */

const DeferAlert = ({
  id,
  className,
  theme,
  icon,
  expires,
  dismissible,
  message,
}) => {
  const { remove } = useDefer();

  // expires
  useTimeout(expires && (() => remove(id)), expires);

  return (
    <div
      className={`
        toast show ${className}
        ${theme ? `bg-${theme} text-white border-0` : ''}
      `}
    >
      <div className="d-flex align-items-center">
        {icon && (
          <div className="ms-3">
            <FA icon={icon} size="lg" />
          </div>
        )}
        <div className="toast-body">
          {message}
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label="Close"
            className={`
              btn-close ${theme ? 'btn-close-white' : ''}
              m-auto me-2
            `}
            onClick={() => remove(id)}
          />
        )}
      </div>
    </div>
  );
};

export default DeferAlert;
