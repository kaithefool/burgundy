import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useLinks from './useLinks';

const SubDirsNav = ({
  className = 'p-4 py-3',
}) => {
  const { t } = useTranslation();
  const { parent } = useLinks(true);

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
