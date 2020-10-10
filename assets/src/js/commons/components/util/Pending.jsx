import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const Pending = ({
  progress = false,
}) => (
  <div className="">
    <FA icon={faSpinner} fixedWidth pulse />
  </div>
);

export default Pending;
