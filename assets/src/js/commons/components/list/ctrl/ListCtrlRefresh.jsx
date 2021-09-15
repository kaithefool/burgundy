import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

import useList from '../useList';

const ListCtrlRefresh = ({
  className = 'btn',
}) => {
  const { refresh } = useList();

  return (
    <button
      onClick={refresh}
      className={className}
    >
      <FA icon={faRedo} fixedWidth />
    </button>
  );
};

export default ListCtrlRefresh;
