import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

import links from './links';

const SubDirsNav = ({
  className = '',
  parent: showParent = true,
}) => {
  const loc = useLocation();
  let parent;

  links.find((g) => {
    parent = g.find(({ to }) => (
      to && matchPath(loc.pathname, { path: to })
    ));

    return parent;
  });

  if (!parent.links) return '';

  return (
    <nav className={`nav nav-tabs-min ${className}`}>
      {showParent && (
        <NavLink
          className="nav-link"
          to={parent.to}
          activeClassName="active"
        >
          {parent.label.subDir || parent.label.default || parent.label}
        </NavLink>
      )}

      {parent.links.map(({ label, icon, ...l }, i) => (
        <NavLink
          key={i}
          className="nav-link"
          activeClassName="active"
          {...l}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default SubDirsNav;
