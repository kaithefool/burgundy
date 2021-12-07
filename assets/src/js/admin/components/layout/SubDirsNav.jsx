import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import linkGroups from './links';

const SubDirsNav = ({
  className = 'p-4 py-3',
}) => {
  const { t } = useTranslation();
  const loc = useLocation();
  let parent;
  let active;

  linkGroups.find((g) => {
    parent = g.find(({ to, links = [] }) => {
      active = [{ to }, ...links].find((l) => (
        to && matchPath(`${l.to}`, loc.pathname)
      ));

      return active;
    });

    return parent;
  });

  if (!parent?.links) return '';

  const { subDirLabel: parentLabel = parent.label } = parent;

  return (
    <div className={className}>
      <nav className="nav nav-tabs">
        {parentLabel && (
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
