import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const Pending = ({
  progress = null,
}) => (
  <div className="">
    <FA icon={faSpinner} fixedWidth pulse />
    {progress !== null && (
      `${Math.round(progress * 100)}%`
    )}
  </div>
);

export default Pending;
