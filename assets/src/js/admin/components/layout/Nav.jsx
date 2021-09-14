import React, { Fragment, useState } from 'react';

import {
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import {
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';

import NavItem from './NavItem';
import links from './links';

const Nav = ({
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className={`d-flex flex-column ${className}`}>
      {/* expand/collapse button */}
      <NavItem
        onClick={() => setExpanded(!expanded)}
        icon={expanded ? faChevronCircleLeft : faChevronCircleRight}
      />
      {/* nav items */}
      <div className="flex-fill nav flex-column justify-content-center">
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
      </div>
      {/* logout */}
      <NavItem
        href="/logout"
        label="Logout"
        icon={faPowerOff}
      />
    </nav>
  );
};

export default Nav;
