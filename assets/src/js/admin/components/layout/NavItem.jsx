import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const activeClassName = 'active';

const NavListItem = ({
  icon,
  label,
  children,
  links,
  expanded,
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
        className="nav-link w-100 my-2 py-1"
        {...props}
        {...(to ? { activeClassName } : {})}
      >
        <FA icon={icon} fixedWidth />
        {expanded && (
          <span className="mx-3">{label}</span>
        )}
      </Link>
      {children && (
        <div className={`ms-3 nav ${match ? '' : 'd-none'}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default NavListItem;
