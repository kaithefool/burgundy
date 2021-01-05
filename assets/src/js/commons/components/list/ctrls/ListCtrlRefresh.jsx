import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

const ListCtrlRefresh = ({
  refresh,
  className = 'btn btn-link',
}) => (
  <button
    onClick={refresh}
    className={className}
  >
    <FA icon={faRedo} fixedWidth />
  </button>
);

export default ListCtrlRefresh;
