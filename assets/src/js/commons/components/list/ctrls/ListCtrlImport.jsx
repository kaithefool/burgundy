import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

const ListCtrlImport = ({
  className = 'btn btn-link',
}) => (
  <button
    className={className}
  >
    <FA icon={faUpload} fixedWidth />
  </button>
);

export default ListCtrlImport;
