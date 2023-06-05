import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons/faFan';

const Pending = ({
  progress = null,
}) => (
  <div className="position-absolute top-0 start-0 w-100 h-100">
    <div
      className={`
        position-absolute top-0 start-0 w-100 h-100
        opacity-50 bg-light
      `}
    />
    <div className="sticky-top py-5 text-center">
      <FA icon={faFan} size="lg" fixedWidth spin />
      {progress !== null && (
        `${Math.round(progress * 100)}%`
      )}
    </div>
  </div>
);

export default Pending;
