import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
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
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [location]);

  return (
    <nav className={`main-nav ${show ? 'show' : ''} ${className}`}>
      <div className="h-100 py-2 py-md-3 d-flex flex-column">
        {/* toggles */}
        <div className="d-none d-md-block">
          <NavItem
            icon={expanded ? faChevronCircleLeft : faChevronCircleRight}
            onClick={() => setExpanded(!expanded)}
          />
        </div>
        <div className="d-block d-md-none">
          <NavItem
            icon={show ? faTimes : faBars}
            onClick={() => setShow(!show)}
          />
        </div>
        {/* list */}
        <div
          className={`
            flex-fill nav flex-column mt-4
            d-md-flex ${show ? 'd-flex' : 'd-none'}
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
