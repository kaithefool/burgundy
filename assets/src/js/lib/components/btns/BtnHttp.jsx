import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

import ModalConfirm from '../modals/ModalConfirm';
import useHttp from '../../hooks/useHttp';
import useRetry from '../../hooks/useRetry';
import useAlert from '../alert/useAlert';

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
