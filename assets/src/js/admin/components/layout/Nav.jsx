import React, { useState } from 'react';

import NavItem from './NavItem.jsx';
import links from './links';

const Nav = ({
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className={`
      main-nav pr-0 py-5 ${className}
      ${expanded ? 'expanded' : ''}
    `}>
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
};

export default Nav;
