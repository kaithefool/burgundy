import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons/faChevronRight';

import NavItem from './NavItem';
import links from './links';

const Nav = ({
  className,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <nav
      className={`
        d-flex vh-100 ${className}
        bg-primary text-white
      `}
    >
      <button
        type="button"
        className="btn btn-sm btn-link link-light"
        onClick={() => setExpanded(!expanded)}
      >
        <FA icon={expanded ? faChevronLeft : faChevronRight} />
      </button>
      <div className="nav align-self-center flex-column">
        {links.map((l) => {
          if (l.divider) return <hr />;

          return (
            <NavItem key={l.label} expanded={expanded} {...l}>
              {l.links && (
                l.links.map((ll) => (
                  <NavItem key={ll.label} expanded={expanded} {...ll} />
                ))
              )}
            </NavItem>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
