import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Nav from '~/shared/components/Nav';
import links from './links';

const NavMainSm = ({
  toggleClassName = 'btn',
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        className={toggleClassName}
        onClick={() => setShow(!show)}
      >
        <FA icon={faBars} fixedWidth />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="modal-left"
        size="sm"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Nav links={links} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavMainSm;
