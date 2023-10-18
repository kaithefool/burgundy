import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Nav from '~/shared/components/Nav';
import links from './links';

const NavMainSm = ({
  toggleClassName = 'btn ms-n3',
}) => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) setShow(false);
  }, [location]);

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
