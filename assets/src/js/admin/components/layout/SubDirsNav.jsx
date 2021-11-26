import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import links from './links';

const SubDirsNav = ({
  className = '',
  parent: showParent = true,
}) => {
  const { t } = useTranslation();
  const loc = useLocation();
  let parent;
  let p;

  links.find((g) => {
    parent = g.find(({ to }) => (
      to && matchPath(`${to}/*`, loc.pathname)
    ));

    return parent;
  });

  if (!parent?.links) return '';

  if (showParent) {
    p = parent.label.subDir || parent.label.default || parent.label;
  }

  return (
    <nav className={`nav nav-tabs-min ${className}`}>
      {showParent && (
        <NavLink
          className="nav-link"
          to={parent.to}
          end
        >
          {t(`nav.${p}`, p)}
        </NavLink>
      )}

      {parent.links.map(({ label, icon, ...l }, i) => (
        <NavLink
          key={i}
          className="nav-link"
          {...l}
        >
          {t(`nav.${label}`, label)}
        </NavLink>
      ))}
    </nav>
  );
};

export default SubDirsNav;
