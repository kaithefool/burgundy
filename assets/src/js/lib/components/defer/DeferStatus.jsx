import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import useDefer from './useDefer';

const DeferStatus = () => {
  const { status } = useDefer();
  const { http, icon, progress } = status;

  return (
    <div className="position-absolute w-100 h-100 top-0 start-0">
      <FA icon={icon} />

    </div>
  );
};

export default DeferStatus;
