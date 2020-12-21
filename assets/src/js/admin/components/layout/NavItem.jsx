import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const activeClassName = 'active';

const NavListItem = ({
  icon,
  label,
  children,
  links,
  ...props
}) => {
  const { to } = props;
  const Link = to ? NavLink : (p) => <a {...p} />;
  const match = useRouteMatch(to);

  return (
    <>
      <Link
        className="nav-link w-100 my-2 py-1"
        {...props}
        {...(to ? { activeClassName } : {})}
      >
        <span className="mr-3">
          <FA icon={icon} fixedWidth size="lg" />
        </span>
        {label}
      </Link>
      {children && (
        <div className={`ml-3 nav ${match ? '' : 'd-none'}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default NavListItem;
