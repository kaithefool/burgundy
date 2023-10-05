import React, { Fragment } from 'react';

import { NavLink, useMatch } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const NavItem = ({
  short = false,
  icon,
  label = '',
  children,
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
        className="nav-link"
        {...props}
      >
        <FA icon={icon} fixedWidth />
        <span
          className={`
            ms-3 me-1
            d-inline ${short ? 'd-md-none' : ''}
          `}
        >
          {t(`nav.${label}`, label)}
        </span>
      </Link>
      {children && (
        <div className={`ms-3 nav flex-column ${match ? '' : 'd-none'}`}>
          {children}
        </div>
      )}
    </>
  );
};

const Nav = ({
  short,
  className = 'nav flex-column',
  links,
}) => (
  <nav className={className}>
    {links.map((g, i) => (
      <Fragment key={i}>
        {/* divider */}
        {!!i && <hr className="mx-4" />}
        {/* link groups */}
        {g.map((l) => (
          <NavItem key={l.label} short={short} {...l}>
            {l.links && (
              l.links.map((ll, ii) => (
                <NavItem
                  key={ii}
                  short={short}
                  {...ll}
                />
              ))
            )}
          </NavItem>
        ))}
      </Fragment>
    ))}
  </nav>
);

export default Nav;
