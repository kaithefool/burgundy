import React, { Fragment, useState } from 'react';

import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';

import NavItem from './NavItem';
import links from './links';

const Nav = ({
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className={`main-nav sticky-top ${className}`}>
      <div className="py-2 py-md-3 d-flex flex-column">
        {/* expand/collapse button */}
        <NavItem
          onClick={() => setExpanded(!expanded)}
          navToggle
          expanded={expanded}
        />
        <div
          className={`
            flex-fill nav flex-column mt-4
            d-md-flex ${expanded ? 'd-flex' : 'd-none'}
          `}
        >
          {/* nav items */}
          {links.map((g, i) => (
            <Fragment key={i}>
              {!!i && <hr className="mx-4" />}
              {g.map((l) => (
                <NavItem key={l.label} expanded={expanded} {...l}>
                  {l.links && (
                    l.links.map((ll, ii) => (
                      <NavItem
                        key={ii}
                        expanded={expanded}
                        subDir
                        {...ll}
                      />
                    ))
                  )}
                </NavItem>
              ))}
            </Fragment>
          ))}
          {/* divider */}
          <div className="flex-fill py-2" />
          {/* logout */}
          <NavItem
            href="/logout"
            label="Logout"
            icon={faPowerOff}
            expanded={expanded}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
