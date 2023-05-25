import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const ListCtrlCreate = ({
  to = 'new',
  className = 'btn px-2 me-3 btn-primary',
  icon = faPlus,
  children,
}) => (
  <Link
    to={to}
    className={className}
  >
    <FA icon={icon} fixedWidth />
    {icon && children && ' '}
    {children}
  </Link>
);

export default ListCtrlCreate;
