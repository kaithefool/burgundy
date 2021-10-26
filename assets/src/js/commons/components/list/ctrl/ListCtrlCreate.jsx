import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import usePath from '../../../hooks/usePath';

const ListCtrlCreate = ({
  to,
  className = 'btn px-2 me-3 btn-primary',
}) => {
  const { path } = usePath();

  return (
    <Link
      to={typeof to === 'string' ? to : path('new')}
      className={className}
    >
      <FA icon={faPlus} fixedWidth />
    </Link>
  );
};

export default ListCtrlCreate;
