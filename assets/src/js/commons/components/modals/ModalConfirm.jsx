import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalConfirm = ({
  header,
  body,
  onConfirm,
  typeToConfirm = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { show, onHide } = props;
  const [input, setInput] = useState('');
  const confirmText = typeof typeToConfirm === 'string'
    || 'DELETE';

  useEffect(() => {
    if (!show) setInput('');
  }, [show]);

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        {header}
      </Modal.Header>
      <Modal.Body>
        {body}
        {typeToConfirm && (
          <>
            <p>
              Type&nbsp;
              <strong>{confirmText}</strong>
              &nbsp;to confirm
            </p>
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => { onConfirm(); onHide(); }}
          disabled={typeToConfirm && input !== confirmText}
        >
          {t('gen.yes')}
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={onHide}
        >
          {t('gen.no')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
