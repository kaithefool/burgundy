import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import {
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import {
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

const NavItem = ({
  icon,
  label = '',
  subDirLabel,
  children,
  expanded,
  subDir = false,
  navToggle = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { to } = props;
  const match = useMatch(to ? `${to}/*` : '');
  const Link = to
    ? NavLink
    : ({ children: c, ...p }) => <a {...p}>{c}</a>;

  return (
    <>
      <Link
        className={`nav-link py-0 my-2 px-4 ${subDir ? 'pe-3' : ''}`}
        {...props}
      >

        {navToggle ? (
          <>
            <FA
              className="d-none d-md-inline-block"
              icon={expanded ? faChevronCircleLeft : faChevronCircleRight}
              fixedWidth
            />
            <FA
              className="d-inline-block d-md-none"
              icon={expanded ? faTimes : faBars}
              fixedWidth
            />
          </>
        ) : (
          <FA icon={icon} fixedWidth />
        )}

        {expanded && (
          <span className="ms-3 me-1">{t(`nav.${label}`, label)}</span>
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

export default NavItem;
