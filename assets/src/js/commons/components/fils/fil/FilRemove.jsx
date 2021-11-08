import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons/faTimesCircle';

import useFil from './useFil';

const FilRemove = (props) => {
  const { remove } = useFil();

  return (
    <button
      type="button"
      className="btn"
      onClick={() => remove()}
      {...props}
    >
      <FA icon={faTimesCircle} size="lg" />
    </button>
  );
};

export default FilRemove;
