import React, { useState } from 'react';

import Modal from '~/commons/components/modals/Modal.jsx';

const PagePages = () => {
  const [modal, setModal] = useState(false);

  console.log('modal', modal);

  return (
    <div>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
      >
        <div className="modal-body">
          Meh!
        </div>
      </Modal>
      <button
        className="btn btn-primary"
        onClick={() => setModal(true)}
      >
        Meh
      </button>
    </div>
  );
};

export default PagePages;
