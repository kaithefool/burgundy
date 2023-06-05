import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import useFil from './useFil';

const FilRemove = ({
  children,
  ...props
}) => {
  const { remove } = useFil();

  return (
    <button
      type="button"
      className="btn"
      onClick={() => remove()}
      {...props}
    >
      {children || <FA icon={faTimes} />}
    </button>
  );
};

export default FilRemove;
