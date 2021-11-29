import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import links from './links';

const SubDirsNav = ({
  className = 'p-4 py-3',
  parent: showParent = true,
}) => {
  const { t } = useTranslation();
  const loc = useLocation();
  let parent;
  let parentLabel;

  links.find((g) => {
    parent = g.find(({ to }) => (
      to && matchPath(`${to}/*`, loc.pathname)
    ));

    return parent;
  });

  if (!parent?.links) return '';

  // check if there is no active link
  if (
    !parent.links.find(({ to }) => (
      to && matchPath(`${to}`, loc.pathname)
    ))
    && !(showParent && parent.to && matchPath(parent.to, loc.pathname))
  ) return '';

  if (showParent) {
    parentLabel = parent.label.subDir
      || parent.label.default
      || parent.label;
  }

  return (
    <div className={className}>
      <nav className="nav nav-tabs-min">
        {showParent && (
          <NavLink
            className="nav-link"
            to={parent.to}
            end
          >
            {t(`nav.${parentLabel}`, parentLabel)}
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
    </div>
  );
};

export default SubDirsNav;
