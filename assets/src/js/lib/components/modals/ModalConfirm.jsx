import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {import('react-bootstrap/Modal').ModalProps} ModalProps
 */

/**
 * @typedef {Object} ConfirmProps
 * @property {(React.ReactNode|string|Function)} header
 * - The header of the modal.
 * @property {(React.ReactNode|string|Function)} body
 * - The body of the modal.
 * @property {(React.ReactNode|string|Function)} footer
 * - The footer of the modal.
 * @property {Function} element
 * - A function to override the default rendering function.
 * @property {Function} onConfirm - A callback that is called when
 * the user confirms.
 * @property {(string|boolean)} typeToConfirm - Whether the user must type
 * a given string to confirm. If set to true, the string is 'OKAY'.
 *
 * @typedef {ModalProps & ConfirmProps} ModalConfirmProps
 */

/**
 * Confirmation modal.
 *
 * @component
 * @param {ModalConfirmProps} props
 */

const ModalConfirm = ({
  header,
  body,
  footer,
  element,
  onConfirm,
  typeToConfirm = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { show, onHide } = props;
  const [input, setInput] = useState('');
  const confirmText = typeof typeToConfirm === 'string'
    ? typeToConfirm : 'OKAY';
  const disabled = typeToConfirm && input !== confirmText;

  useEffect(() => {
    if (!show) setInput('');
  }, [show]);

  const render = (section) => (
    typeof section === 'function'
      ? section({ onHide, onConfirm, disabled })
      : section
  );

  if (element) return element({ show, onHide, onConfirm });

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        {render(header)}
      </Modal.Header>
      <Modal.Body>
        {render(body)}
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
        {footer ? render(footer) : (
          <>
            <button
              className="btn btn-primary"
              type="button"
              onClick={onConfirm}
              disabled={disabled}
            >
              {t('yes')}
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={onHide}
            >
              {t('no')}
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
