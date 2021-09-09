import React, { Fragment, useState } from 'react';

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
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      className={`
        d-flex vh-100 ${className}
      `}
    >
      <button
        type="button"
        className="btn btn-sm btn-primary rounded-circle position-absolute"
        onClick={() => setExpanded(!expanded)}
      >
        <FA icon={expanded ? faChevronLeft : faChevronRight} />
      </button>
      <div className="nav align-self-center flex-column">
        {links.map((g, i) => (
          <Fragment key={i}>
            {!!i && <hr />}
            {g.map((l) => (
              <NavItem key={l.label} expanded={expanded} {...l}>
                {l.links && (
                  l.links.map((ll, ii) => (
                    <NavItem key={ii} expanded={expanded} {...ll} />
                  ))
                )}
              </NavItem>
            ))}
          </Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
