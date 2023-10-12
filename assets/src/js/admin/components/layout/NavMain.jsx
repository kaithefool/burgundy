import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons/faChevronRight';

import useStorage from '~/lib/hooks/useStorage';
import Nav from '~/shared/components/Nav';
import Logo from '~/shared/components/Logo';
import Circle from '~/lib/components/layout/Circle';
import links from './links';

const NavMain = ({ className = '' }) => {
  const [short, setShort] = useStorage('admin/nav-short', true);

  return (
    <div className={`main-nav ${className}`}>
      <div className="position-sticky" style={{ top: 0 }}>
        <Logo short={short} />
        <button
          type="button"
          className="btn p-1 position-absolute"
          style={{ top: '1rem', right: '-1rem', zIndex: 1 }}
          onClick={() => setShort(!short)}
        >
          <Circle
            className="bg-white shadow-sm border"
            style={{ width: '1.4rem', fontSize: '.7rem' }}
            text={(
              <FA
                icon={short ? faChevronRight : faChevronLeft}
                fixedWidth
              />
          )}
          />
        </button>
        <Nav links={links} short={short} />
      </div>
    </div>
  );
};

export default NavMain;
