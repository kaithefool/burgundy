import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const ListCtrlCreate = ({ opts: to, className = 'btn btn-link' }) => {
  const { path } = useRouteMatch();

  return (
    <Link
      to={typeof to === 'string' ? to : `${path}/new`}
      className={className}
    >
      <FA icon={faPlus} fixedWidth />
    </Link>
  );
};

export default ListCtrlCreate;
