import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const NavListItem = ({
  icon,
  label = '',
  children,
  links,
  expanded,
  subDir = false,
  ...props
}) => {
  const { to } = props;
  const Link = to
    ? NavLink
    : ({ children: c, ...p }) => <a {...p}>{c}</a>;
  const match = useRouteMatch(to);

  return (
    <>
      <Link
        className={`nav-link py-0 my-2 px-4 ${subDir ? 'pe-3' : ''}`}
        {...props}
        {...(to ? { activeClassName: 'active' } : {})}
      >
        <FA icon={icon} fixedWidth />
        {expanded && (
          <span className="ms-3 me-1">{label.default || label}</span>
        )}
      </Link>
      {children && (
        <div className={`ms-2 nav flex-column ${match ? '' : 'd-none'}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default NavListItem;
