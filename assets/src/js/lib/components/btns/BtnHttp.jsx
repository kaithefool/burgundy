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
  onClick = () => {},
  retry,
  confirm = false,
  typeToConfirm = false,
  onConfirm,
  alert = false,
  ...props
}) => {
  const { t } = useTranslation();

  // http
  const httpDef = useHttp();
  const http = api ? httpDef : httpProp;
  const res = http?.res || resProp;
  const req = http?.req || reqProp || (() => req(api));
  const { status } = res;
  const i = status === 'pending' ? faSpinner : icon;

  // retries
  const { paused, attempt, error } = useRetry(retry);

  // confirm modal
  const [confirmModal, setConfirmModal] = useState(false);
  const confirmBody = typeof confirm !== 'boolean'
    ? confirm : t('res.confirm');

  useEffect(() => {
    if (retry && status && (status === 'error' || retry.always)) attempt();
  }, [status]);

  useAlert(alert && res, alert);

  return (
    <>
      {confirm && (
        <ModalConfirm
          show={confirmModal}
          onConfirm={onConfirm || req}
          onHide={() => setConfirmModal(false)}
          typeToConfirm={typeToConfirm}
          body={confirmBody}
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
            setConfirmModal(true);
          } else {
            onClick.apply(this, args);
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
