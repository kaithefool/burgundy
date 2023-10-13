import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';

import Avatar from './Avatar';
import ListItem from './ListItem';
import Nav from './Nav';
import { useMine } from './mine';

const NavAcc = ({
  toggleClassName = 'btn',
  links = [],
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
        <Avatar type="user" entry={mine} size={2} />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="modal-right"
        size="sm"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="p-2">
            <ListItem type="user" entry={mine} avatar={{ size: 2.4 }}>
              <div className="text-muted small">
                {t(mine.role, capitalize(mine.role))}
              </div>
            </ListItem>
          </div>
          <Nav links={links} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavAcc;
