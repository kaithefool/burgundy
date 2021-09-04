import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons/faFan';

const Pending = ({
  progress = null,
}) => (
  <div className="">
    <FA icon={faFan} fixedWidth spin />
    {progress !== null && (
      `${Math.round(progress * 100)}%`
    )}
  </div>
);

export default Pending;
