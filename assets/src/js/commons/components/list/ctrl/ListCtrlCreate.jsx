import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import path from '~/commons/helpers/path';

const ListCtrlCreate = ({
  to,
  className = 'btn',
}) => (
  <Link
    to={typeof to === 'string' ? to : path.resolve('new')}
    className={className}
  >
    <FA icon={faPlus} fixedWidth />
  </Link>
);

export default ListCtrlCreate;
