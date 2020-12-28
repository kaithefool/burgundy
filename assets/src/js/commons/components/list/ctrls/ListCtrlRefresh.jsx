import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

const ListCtrlRefresh = ({ refresh }) => (
  <button
    onClick={refresh}
    className="btn btn-primary"
  >
    <FA icon={faRedo} fixedWidth />
  </button>
);

export default ListCtrlRefresh;
