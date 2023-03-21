import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const NavItem = ({
  icon,
  label = '',
  subDirLabel,
  children,
  expanded,
  subDir = false,
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
        <FA icon={icon} fixedWidth />
        <span
          className={`
            ms-3 me-1 d-inline
            ${expanded ? '' : 'd-md-none'}
          `}
        >
          {t(`nav.${label}`, label)}
        </span>
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
