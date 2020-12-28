import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

const ListCtrlImport = () => (
  <button
    className="btn btn-primary"
  >
    <FA icon={faUpload} fixedWidth />
  </button>
);

export default ListCtrlImport;
