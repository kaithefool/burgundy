import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

import useList from '../useList';

const ListCtrlRefresh = ({
  className = 'btn px-2 me-3 btn-neutral',
}) => {
  const { refresh } = useList();

  return (
    <button
      type="button"
      onClick={refresh}
      className={className}
    >
      <FA icon={faRedo} fixedWidth />
    </button>
  );
};

export default ListCtrlRefresh;
