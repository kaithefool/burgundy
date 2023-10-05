import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';

import Avatar from './Avatar';
import ListItem from './ListItem';
import { useMine } from './mine';

const NavAcc = ({
  toggleClassName = 'btn',
}) => {
  const { t } = useTranslation();
  const { mine } = useMine();
  const [show, setShow] = useState(false);

  if (!mine) {
    return (
      <Link to="/auth">
        <Avatar icon={faSignInAlt} />
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        className={toggleClassName}
        onClick={() => setShow(!show)}
      >
        <Avatar type="user" entry={mine} size={1.8} />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="modal-right"
        size="sm"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <ListItem type="user" entry={mine} avatar={{ size: 2.4 }}>
            <div className="text-muted small">
              {t(mine.role, capitalize(mine.role))}
            </div>
          </ListItem>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavAcc;
