import React from 'react';

import NavItem from './NavItem.jsx';
import links from './links';

const Nav = () => (
  <nav className="col main-nav bg-white pr-0 py-5">
    <div className="nav flex-column pl-3">
      {links.map((l, i) => (
        <NavItem key={i} {...l}>
          {l.links && (
            l.links.map((ll, ii) => (
              <NavItem key={ii} {...ll} />
            ))
          )}
        </NavItem>
      ))}
    </div>
  </nav>
);

export default Nav;
