import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const ListCtrlCreate = ({ to }) => (
  <Link
    to={to}
    className="btn btn-primary"
  >
    <FA icon={faPlus} fixedWidth />
  </Link>
);

export default ListCtrlCreate;
