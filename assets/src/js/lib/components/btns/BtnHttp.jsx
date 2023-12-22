import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

import ModalConfirm from '../modals/ModalConfirm';
import useHttp from '../../hooks/useHttp';
import useRetry from '../../hooks/useRetry';
import useAlert from '../alert/useAlert';

/**
 * @typedef {Object} BtnHttpProps
 * @property {import('../../hooks/useHttp').HttpRequest} [api]
 * - The config for making the HTTP request when clicked.
 * @property {import('../../hooks/useHttp').HttpState} [http]
 * - The HTTP state from useHttp. Use this to override the default HTTP state.
 * @property {import('../../hooks/useHttp').HttpResponse} [res]
 * - The HTTP response state from useHttp.
 * Use this to override the default HTTP response state.
 * @property {import('../../hooks/useHttp').httpStateRequest} [req]
 * - The HTTP request function from useHttp.
 * Use this to override the default HTTP request function.
 * @property {import('@fortawesome/fontawesome-svg-core')
 * .IconDefinition} [icon] - The icon to display.
 * @property {React.ReactNode} [children]
 * - Content to display inside the button.
 * @property {boolean} [disabled] - Disables the button.
 * @property {string} [className] - Additional class names.
 * @property {function} [onClick] - Custom click handler.
 * @property {import('../../hooks/useRetry').RetryOptions} [retry]
 * - Retry options for the HTTP request.
 * @property {import('../modals/ModalConfirm')
 * .ModalConfirmProps
 * |boolean} [confirm]
 * - Whether to need the user to confirm within a confirmation modal
 * before making the HTTP request. If set to true, default confirmation
 * config will be used.
 * @property {boolean} alert
 */

/**
 * A button component that makes HTTP requests.
 *
 * @component
 * @param {BtnHttpProps} props
 */

const BtnHttp = ({
  api,
  http: httpProp,
  res: resProp,
  req: reqProp,
  icon,
  children,
  disabled,
  className = '',
  onClick,
  retry,
  confirm = false,
  alert,
  ...props
}) => {
  const { t } = useTranslation();

  // http
  const httpDef = useHttp();
  const http = httpProp || (api && httpDef);
  const res = resProp || http?.res;
  const req = reqProp || ((values) => http?.req({
    ...api,
    ...values && Object.keys(values).length && {
      data: { ...api.data, ...values },
    },
  }));
  const { status } = res;
  const i = status === 'pending' ? faSpinner : icon;

  // retries
  const { paused, attempt, error } = useRetry(retry);

  // confirm modal
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    if (retry && status && (status === 'error' || retry.always)) attempt();
  }, [status]);

  useAlert(
    ((api && alert !== false) || !!alert) && res,
    typeof alert === 'object' && alert,
  );

  return (
    <>
      {confirm && (
        <ModalConfirm
          {...typeof confirm === 'object' && confirm}
          show={confirmModal}
          onHide={() => setConfirmModal(false)}
          onConfirm={(values) => {
            (confirm.onConfirm || req)(values);
            setConfirmModal(false);
          }}
          typeToConfirm={confirm.typeToConfirm}
          body={
            confirm?.body
            ?? (typeof confirm === 'string' && confirm)
            ?? t('res.confirm')
          }
        />
      )}
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
          if (confirm) {
            args[0].preventDefault();
            setConfirmModal(true);
          } else if (onClick) {
            onClick.apply(this, args);
          } else {
            req();
          }
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
    </>
  );
};

export default BtnHttp;
